
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken'; 
import DropboxResetPasswordEmail from '@/email-templates/resetpassword-template';
import { prisma } from "@/services/database";



// src/app/api/auth/forgotpassword
/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Envia um e-mail de redefinição de senha
 *     description: Este endpoint envia um e-mail de redefinição de senha para o usuário, contendo um link com um token JWT para redefinir a senha.
 *     tags:
 *       - Login Methods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *             properties:
 *               userEmail:
 *                 type: string
 *                 format: email
 *                 description: O e-mail do usuário para quem o link de redefinição de senha será enviado.
 *     responses:
 *       200:
 *         description: E-mail de redefinição de senha enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Confirmação do envio do e-mail.
 *       400:
 *         description: Requisição inválida, geralmente devido à falta do e-mail do destinatário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A mensagem de erro explicando o motivo da falha.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro explicando o problema encontrado.
 */



const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const { userEmail } = body;

        const user = await prisma.users.findUnique({
            where: {
                email: userEmail,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Email Não Cadastrado." }, { status: 404 });
        }
        
        const resetPasswordToken = jwt.sign(
            { email: userEmail },
        //@ts-ignore
            process.env.JWT_SECRET ,
            { expiresIn: '20m' } 
        );

        // Construa o link de redefinição de senha com o token
        const resetPasswordLink = `https://jobeiros.com/reset-password/${resetPasswordToken}`;

        if (!userEmail) {
            return NextResponse.json({ error: "Email do destinatário não fornecido." }, { status: 400 });
        }




        // Envia o e-mail de redefinição de senha
        const data = await resend.emails.send({
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
            to: [userEmail],
            subject: 'Redefina sua senha Jobeiros',
            react: DropboxResetPasswordEmail({
                userFirstname: user?.name || 'Usuário',
                resetPasswordLink: resetPasswordLink,
            }),
        });

        return NextResponse.json({ data });

    } catch (e) {
        //@ts-ignore
        return NextResponse.json({ error: e.message || 'Ocorreu um erro desconhecido.' }, { status: 500 });
    }
}

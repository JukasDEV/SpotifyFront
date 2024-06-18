import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/services/database';
import LeadEmail from '@/email-templates/emaillead';

/**
 * @swagger
 * paths:
 *  /api/leads-email:
 *    post:
 *      summary: Envia um email para usuários com plano FREE
 *      tags:
 *        - Email
 *      description: >
 *        Envia um email de boas-vindas personalizado para todos os usuários com plano FREE utilizando a plataforma Resend.
 *      responses:
 *        '200':
 *          description: Emails enviados com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Detalhes da resposta do serviço de email, como quantidade de emails enviados.
 *        '404':
 *          description: Nenhum usuário encontrado com plano FREE.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Mensagem de erro explicando a ausência de usuários com plano FREE.
 *        '500':
 *          description: Erro interno do servidor.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Mensagem de erro explicando o problema interno.
 */

const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const users = await prisma.users.findMany({
            where: {
                plan: 'FREE'
            },
            select: {
                email: true,
                name: true
            }
        });

        if (users.length === 0) {
            return NextResponse.json({ error: 'Nenhum usuário encontrado com plano FREE.' }, { status: 404 });
        }

        await Promise.all(users.map(user =>
            resend.emails.send({
                from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
                to: [user.email],
                subject: `Parabéns ${user.name}, você foi selecionado`,
                react: LeadEmail({ userFirstname: user.name || 'Visitante' }),
            })
        ));

        return NextResponse.json({ message: `Emails enviados com sucesso para ${users.length} usuários.` });

    } catch (e) {
        //@ts-ignore
        return NextResponse.json({ error: e.message || 'Ocorreu um erro desconhecido.' }, { status: 500 });
    }
}

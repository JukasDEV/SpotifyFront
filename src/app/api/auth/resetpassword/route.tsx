import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from "@/services/database";

/**
 * @swagger
 * /api/auth/resetpassword:
 *   post:
 *     summary: Redefine a senha do usuário
 *     description: Permite ao usuário redefinir a senha usando um token de redefinição.
 *     tags:
 *       - Login Methods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: O token JWT fornecido para a redefinição de senha.
 *               newPassword:
 *                 type: string
 *                 description: A nova senha que o usuário deseja estabelecer.
 *               confirmPassword:
 *                 type: string
 *                 description: A confirmação da nova senha para verificar se elas coincidem.
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem indicando o sucesso da operação.
 *       400:
 *         description: Dados de requisição inválidos, como senhas que não coincidem ou token ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       401:
 *         description: Token de redefinição inválido ou expirado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       404:
 *         description: Usuário não encontrado no sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro.
 */



export async function POST(req: NextRequest) {
    try {
        const { token, newPassword, confirmPassword } = await req.json();

        // Verifica se as senhas fornecidas são iguais.
        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "As senhas não coincidem." }, { status: 400 });
        }

        // Decodifica o token JWT para obter o e-mail do usuário.
        //@ts-ignore
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;

        if (!userEmail) {
            return NextResponse.json({ error: "Token inválido." }, { status: 400 });
        }

        // Busca o usuário pelo e-mail obtido do token.
        const user = await prisma.users.findUnique({
            where: {
                email: userEmail,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
        }

        // Hash da nova senha antes de salvar no banco de dados.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualiza a senha do usuário no banco de dados.
        await prisma.users.update({
            where: {
                email: userEmail,
            },
            data: {
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Senha redefinida com sucesso." });

    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // Trata o erro de verificação do token JWT.
            return NextResponse.json({ error: "Token de redefinição inválido ou expirado." }, { status: 401 });
        }

        //@ts-ignore
        return NextResponse.json({ error: e.message || 'Ocorreu um erro desconhecido.' }, { status: 500 });
    }
}

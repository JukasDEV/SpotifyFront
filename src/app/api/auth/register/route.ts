import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário.
 *     tags:
 *       - Login Methods
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       400:
 *         description: E-mail já está em uso.
 *       500:
 *         description: Erro interno do servidor.
 */

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            throw new Error("Todos os campos são obrigatórios");
        }

        const existingUser = await prisma.users.findUnique({
            where: {
                Email: email,
            },
        });

        if (existingUser) {
            throw new Error("E-mail já está em uso");
        }

        // Hash da senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário no banco de dados
        const newUser = await prisma.users.create({
            data: {
                Email: email,
                Password: hashedPassword,
                Name: name,
            },
        });

        const token = jwt.sign({ userId: newUser.Id }, 'process.env.JWT_SECRET', { expiresIn: '12h' });

        // Registro bem-sucedido, retornando o token
        return NextResponse.json({
            message: "Registro bem-sucedido",
            token,
            userid: newUser.Id,
            plan: newUser.planId
        });
    } catch (err: unknown) {
        const error = (err as Error).toString();
        console.error(error);
        return NextResponse.json({
            message: error,
        }, { status: 500 });
    }
}

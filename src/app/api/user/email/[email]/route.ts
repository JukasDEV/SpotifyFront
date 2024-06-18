import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";

export async function GET(req: NextRequest, res: NextResponse){
    try {
        const email = req.nextUrl.pathname.split('/').pop();

        if (!email) {
            throw new Error("E-mail não fornecido");
        }

        const user = await prisma.users.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return NextResponse.json({
            email: user.email,
            plan: user.plan,
            credits_interview: user.credits_interview,
            credits_resume: user.credits_resume,
            credits_analyze: user.credits_analyze,
        });
    } catch (err) {
        throw err
    }
}

export async function POST(req: NextRequest) {
    try {
        const email = req.nextUrl.pathname.split('/').pop();
        const updates = await req.json(); // Obtém os dados de atualização do corpo da solicitação

        if (!email) {
            throw new Error("ID do usuário não fornecido");
        }

        const updatedUser = await prisma.users.update({
            where: {
                email: email
            },
            data: updates, 
        });

        return new NextResponse(JSON.stringify(updatedUser), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err: unknown) {
        const error = err as Error;
        return new NextResponse(error.message, { status: 500 });
    }
}
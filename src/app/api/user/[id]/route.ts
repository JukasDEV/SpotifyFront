import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";

export async function GET(req: NextRequest, res: NextResponse){
    try {
        const userId = req.nextUrl.pathname.split('/').pop();
        
        if (!userId) {
            throw new Error("ID do usuário não fornecido");
        }

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(userId, 10),
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
            id: user.id,
        });
    } catch (err) {
        throw err
    }
}


export async function POST(req: NextRequest) {
    try {
        const userId = req.nextUrl.pathname.split('/').pop();
        const updates = await req.json(); // Obtém os dados de atualização do corpo da solicitação

        if (!userId) {
            throw new Error("ID do usuário não fornecido");
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: parseInt(userId, 10), 
            },
            data: updates, 
        });

        return new NextResponse(JSON.stringify(updatedUser), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err: unknown) {
        const error = err as Error;
        return new NextResponse(error.message, { status: 500 });
    }
}
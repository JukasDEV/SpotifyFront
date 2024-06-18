import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const userId = req.nextUrl.pathname.split('/').pop();

        if(!userId){
            throw new Error("ID do usuário não fornecido");
        }

        const interviews = await prisma.interviewlog.findMany({
            where: {
                userid: parseInt(userId, 10),
            },
        });

        return NextResponse.json(interviews)
        
    } catch (err) {
        throw NextResponse.json({
            status: 'error',
            //@ts-ignore
            error: err.message || 'Um erro desconhecido ocorreu.',
        }, { status: 500 });
    }
}
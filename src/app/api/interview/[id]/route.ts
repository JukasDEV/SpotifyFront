import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        const interviewId = req.nextUrl.pathname.split('/').pop();

        if(!interviewId){
            throw new Error("ID da entrevista não fornecido");
        }

        const interview = await prisma.interviewlog.findUnique({
            where: {
                id: parseInt(interviewId, 10),
            },
        });

        return NextResponse.json(interview)
        
    } catch (err) {
        throw NextResponse.json({
            status: 'error',
            //@ts-ignore
            error: err.message || 'Um erro desconhecido ocorreu.',
        }, { status: 500 });
    }
}
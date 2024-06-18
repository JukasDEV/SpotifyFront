import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";

export async function GET(req: NextRequest, res: NextResponse){
    try {
        const offer_id = req.nextUrl.pathname.split('/').pop();

        if (!offer_id) {
            throw new Error("Offer_id não fornecido");
        }

        const plan = await prisma.plans.findFirst({
            where: {
                offer_id: offer_id,
            },
        });

        if (!plan) {
            throw new Error("Plano não encontrado");
        }
        return NextResponse.json(plan);
    } catch (err) {
        throw err
    }
}

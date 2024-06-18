import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";


/**
 * @swagger
 * paths:
 *   /api/getsamples:
 *     get:
 *       summary: Obtém todos os currículos
 *       description: Retorna todos os currículos da tabela `samplesresumes`, excluindo as informações de `link`.
 *       responses:
 *         200:
 *           description: Uma lista de currículos.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: O ID único do currículo.
 *                     tag:
 *                       type: string
 *                       description: A tag associada ao currículo.
 *                     img:
 *                       type: string
 *                       description: A URL da imagem do currículo.
 *                     plan:
 *                       type: string
 *                       description: O plano associado ao currículo.
 *                     title:
 *                       type: string
 *                       description: O título do currículo.
 *         500:
 *           description: Erro interno do servidor.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Mensagem de erro detalhando o problema.
 */


export async function GET(req: NextRequest) {
    try {
        // Busca todos os registros na tabela sampleresumes, excluindo a coluna 'link'
        const resumes = await prisma.samplesresumes.findMany({
            select: {
                id: true,
                tag: true,
                img: true,
                plan: true,
                title: true,
                companyicon: true,
                ordem: false
            },
            orderBy: {
                ordem: 'asc'
            }
        });

        return new NextResponse(JSON.stringify(resumes), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        //@ts-ignore
        return new NextResponse(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

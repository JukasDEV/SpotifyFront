import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";


/**
 * @swagger
 * paths:
 *   /api/getsamples/{id}:
 *     get:
 *       summary: Obtém detalhes do currículo
 *       description: Retorna o ID e o link do currículo da tabela `samplesresumes`.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: O ID do currículo.
 *       responses:
 *         200:
 *           description: Detalhes do currículo.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID único do currículo.
 *                   link:
 *                     type: string
 *                     description: O link para o currículo.
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
        // Extrai o ID do currículo da URL
        const pathParts = req.nextUrl.pathname.split('/');
        const id = pathParts[pathParts.length - 1]; // Assume que o ID é o último segmento da URL

        // Converte o ID para um número e verifica se é válido
        const resumeId = parseInt(id, 10);
        if (isNaN(resumeId)) {
            return new NextResponse(JSON.stringify({ error: "ID do currículo inválido." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Busca o currículo específico pelo ID
        const resume = await prisma.samplesresumes.findUnique({
            where: {
                id: resumeId,
            },
            select: {
                id: true,
                link: true // Seleciona apenas 'id' e 'link'
            },
        });

        // Verifica se o currículo foi encontrado
        if (!resume) {
            return new NextResponse(JSON.stringify({ error: "Currículo não encontrado." }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new NextResponse(JSON.stringify(resume), {
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
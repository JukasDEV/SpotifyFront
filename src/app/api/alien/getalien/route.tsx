export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/services/database';

/**
 * @swagger
 * paths:
 *   /api/alien/getalien:
 *     get:
 *       summary: Obtém todos os alienígenas ativos
 *       description: Retorna todos os registros da tabela alienígena onde ativo é igual a 1.
 *       tags:
 *         - Alienigena
 *       responses:
 *         200:
 *           description: Lista de alienígenas ativos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do alienígena
 *                     imagem:
 *                       type: string
 *                       description: URL da imagem do alienígena
 *                     nome_alien:
 *                       type: string
 *                       description: Nome do alienígena
 *                     horario:
 *                       type: string
 *                       format: timestamp
 *                       description: Horário do avistamento
 *                     ativo:
 *                       type: boolean
 *                       description: Status do alienígena
 *         500:
 *           description: Erro interno do servidor
 */

export async function GET(req: NextRequest) {
  try {
    const alienigenas = await prisma.alienigena.findMany({
      where: {
        ativo: 1,
      },
    });

    return NextResponse.json(alienigenas);
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

import { prisma } from '@/services/database';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * paths:
 *   /api/playlist/getplaylist/{userid}:
 *     get:
 *       summary: Obtém todas as playlists de um usuário específico pelo UserId
 *       description: Retorna todas as playlists criadas por um usuário específico baseado no UserId.
 *       tags:
 *         - Playlists
 *       parameters:
 *         - in: path
 *           name: userid
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID do usuário
 *       responses:
 *         200:
 *           description: Retorna as playlists solicitadas
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Id:
 *                       type: integer
 *                       description: ID da playlist
 *                     PlaylistName:
 *                       type: string
 *                       description: Nome da playlist
 *                     UserId:
 *                       type: integer
 *                       description: ID do usuário que criou a playlist
 *                     CreatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Data de criação da playlist
 *         404:
 *           description: Nenhuma playlist encontrada para o usuário
 *         500:
 *           description: Erro interno do servidor
 */

export async function GET(req: NextRequest) {
  try {
    // Extrai os parâmetros da URL
    const url = new URL(req.url);
    const pathname = url.pathname;
    const paths = pathname.split('/');
    const userid = parseInt(paths[paths.length - 1], 10);

    if (isNaN(userid)) {
      return new NextResponse(
        JSON.stringify({ error: 'Parâmetro userid inválido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Busca todas as playlists do usuário específico na tabela Playlists
    const playlists = await prisma.playlists.findMany({
      where: {
        UserId: userid,
      },
    });

    if (!playlists || playlists.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Nenhuma playlist encontrada para o usuário' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return NextResponse.json(playlists);
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

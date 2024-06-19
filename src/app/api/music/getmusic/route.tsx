export const dynamic = 'force-dynamic';
import { prisma } from '@/services/database';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * paths:
 *   /api/music/getmusic:
 *     get:
 *       summary: Obtém todas as músicas
 *       description: Retorna todas as músicas da tabela Songs.
 *       tags:
 *         - Songs
 *       responses:
 *         200:
 *           description: Retorna todas as músicas
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Id:
 *                       type: integer
 *                       description: ID da música
 *                     SongName:
 *                       type: string
 *                       description: Nome da música
 *                     Duration:
 *                       type: integer
 *                       description: Duração da música em segundos
 *                     AlbumId:
 *                       type: integer
 *                       description: ID do álbum
 *                     ArtistId:
 *                       type: integer
 *                       description: ID do artista
 *                     BandId:
 *                       type: integer
 *                       description: ID da banda
 *                     CreatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Data de criação da música
 *         404:
 *           description: Nenhuma música encontrada
 *         500:
 *           description: Erro interno do servidor
 */

export async function GET(req: NextRequest) {
  try {
    // Busca todas as músicas da tabela Songs
    const songs = await prisma.songs.findMany();

    if (!songs || songs.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Nenhuma música encontrada' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return NextResponse.json(songs);
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

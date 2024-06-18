import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/services/database';

/**
 * @swagger
 * paths:
 *   /api/playlist/createplaylist:
 *     post:
 *       summary: "Creates a new playlist entry"
 *       description: "This endpoint allows users to create a new entry in the 'Playlists' table."
 *       tags:
 *         - "Playlists"
 *       consumes:
 *         - "application/json"
 *       produces:
 *         - "application/json"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - PlaylistName
 *                 - UserId
 *               properties:
 *                 PlaylistName:
 *                   type: string
 *                   example: "My Favorite Songs"
 *                 description:
 *                   type: string
 *                   example: "A collection of my favorite songs"
 *                 Image:
 *                   type: string
 *                   example: "http://example.com/image.png"
 *                 UserId:
 *                   type: integer
 *                   example: 1
 *       responses:
 *         201:
 *           description: "Playlist created successfully"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: "Playlist created successfully"
 *                   playlist:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       PlaylistName:
 *                         type: string
 *                       description:
 *                         type: string
 *                       Image:
 *                         type: string
 *                       UserId:
 *                         type: integer
 *                       CreatedAt:
 *                         type: string
 *                         format: date-time
 *         500:
 *           description: "Error creating playlist"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: "Error creating playlist"
 *                   error:
 *                     type: string
 *                     description: "Error message detailing the issue."
 */

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Create a new playlist entry in the database
    const newPlaylist = await prisma.playlists.create({
      data: {
        PlaylistName: data.PlaylistName,
        description: data.description,
        Image: data.Image,
        UserId: data.UserId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Playlist created successfully',
        playlist: newPlaylist,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Request error', error);
    return new NextResponse(
      JSON.stringify({
        message: 'Error creating playlist',
        //@ts-ignore
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

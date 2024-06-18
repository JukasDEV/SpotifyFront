import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/services/database';


// src/app/api/openai/recruiterrandom
/**
 * @swagger
 * /api/openai/recruiterrandom:
 *   get:
 *     summary: Retorna um texto aleatório da tabela interviewRecruiter.
 *     tags: 
 *      - OpenAI
 *     responses:
 *       200:
 *         description: Um texto aleatório foi encontrado e retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   description: O texto aleatório obtido da tabela interviewRecruiter.
 *                   example: "Exemplo de texto retornado..."
 *       404:
 *         description: Nenhuma entrada foi encontrada na tabela interviewRecruiter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro informando que nenhuma entrada foi encontrada.
 *                   example: "No entry found"
 *       405:
 *         description: Método HTTP não permitido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro informando que o método HTTP não é permitido.
 *                   example: "Method Not Allowed"
 *       500:
 *         description: Erro interno do servidor ao tentar buscar uma entrada aleatória.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro informando sobre um erro interno do servidor.
 *                   example: "Internal Server Error"
 */


export async function GET(req: NextRequest) {
    // Verifica se o método da requisição é GET
    if (req.method !== 'GET') {
      return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
    }
  
    try {
      // Executa a consulta SQL bruta para selecionar um registro aleatório
      const randomEntry = await prisma.$queryRaw`SELECT Text FROM interviewRecruiter ORDER BY RANDOM() LIMIT 1`;

      console.log(randomEntry);
  
      // Verifica se um registro foi encontrado
      //@ts-ignore
      if (randomEntry.length > 0) {
      //@ts-ignore
      const text = randomEntry[0].Text || randomEntry[0].text; // Ajuste conforme a propriedade retornada
        // Retorna o texto encontrado
        return new NextResponse(JSON.stringify({ text: text }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Retorna um erro caso nenhum registro seja encontrado
        return new NextResponse(JSON.stringify({ error: 'No entry found' }), { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching random entry:', error);
      // Retorna um erro em caso de falha na execução da consulta
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
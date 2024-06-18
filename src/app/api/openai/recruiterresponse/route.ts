import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/services/database'; 
import { sleep } from 'openai/core.mjs';

// src/app/api/openai/recruiterresponse
/**
 * @swagger
 * /api/openai/recruiterresponse: # Substitua "yourEndpoint" pelo caminho real do seu endpoint
 *   post:
 *     summary: Avalia respostas de entrevistas de emprego e sugere melhorias.
 *     description: Este endpoint recebe um título de vaga e um conjunto de perguntas e respostas, avalia cada resposta considerando uma entrevista de emprego, e indica melhorias com uma resposta recomendada para cada questão.
 *     tags:
 *       - OpenAI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *                 description: O título da vaga para a qual as perguntas de entrevista estão sendo avaliadas.
 *                 example: 'Engenheiro de Software'
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - question
 *                     - answer
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: A pergunta feita ao candidato.
 *                       example: 'Quais são suas maiores forças?'
 *                     answer:
 *                       type: string
 *                       description: A resposta do candidato à pergunta.
 *                       example: 'Minhas maiores forças são...'
 *     responses:
 *       200:
 *         description: Avaliações e recomendações geradas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 evaluations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         description: A pergunta original feita ao candidato.
 *                       originalAnswer:
 *                         type: string
 *                         description: A resposta original do candidato.
 *                       evaluation:
 *                         type: string
 *                         description: Avaliação da resposta com sugestões de melhorias e resposta recomendada.
 *       500:
 *         description: Erro interno do servidor.
 */

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    const { title, questions } = await req.json();
    
    //@ts-ignore
    // Concatena todas as perguntas e respostas para enviar à API.
    const combinedContent = questions.reduce((acc, q, index) => (
        `${acc}\nPergunta ${index + 1}: ${q.question}\nResposta: ${q.answer}\n`
    ), `Você é um avaliador em uma entrevista de emprego para a posição de ${title}.`);
    
    const promptEnd = "\n---\nPor favor, avalie cada resposta separadamente abaixo, seguindo este formato:\n**Avaliação da Resposta: Pergunta [número da pergunta]**\n[Avaliação]\n**Melhoria Sugerida:**\n[Sugestão de melhoria]\n**Resposta Recomendada:**\n[Resposta recomendada]\n---\n";
    
    //,...
    //commit pelo jobeiros
    const requestBodyOpenAI = {
        model: "gpt-3.5-turbo-16k",
        messages: [
            {
                role: "system",
                content: combinedContent + promptEnd
            }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBodyOpenAI, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const evaluationsText = response.data.choices[0].message.content.trim();

        const pattern = /Avaliação da Resposta: Pergunta \d+:/g; // Um padrão genérico para identificar o início de uma nova avaliação
        const evaluationsParts = evaluationsText.split(pattern);

        // Processa cada parte para extrair as informações relevantes
        //@ts-ignore
        const evaluations = evaluationsParts.map((part, index) => {
            const evaluation = part.trim(); // Supõe-se que 'part' contenha as informações de uma avaliação
            return {
                question: questions[index]?.question, 
                originalAnswer: questions[index]?.answer, 
            };
        });
        //...
        return NextResponse.json(evaluations);
    } catch (error) {
        console.error("Error calling OpenAI API or processing data:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/services/database'; // Certifique-se de que este caminho esteja correto

/**
 * @swagger
 * /api/openai:
 *   post:
 *     summary: Gera perguntas de entrevista baseadas no cargo e detalhes da vaga.
 *     tags:
 *       - OpenAI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - jobDetails
 *               - userid
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: 'Engenheiro de Software'
 *                 description: O título do cargo para o qual as perguntas de entrevista serão geradas.
 *               jobDetails:
 *                 type: string
 *                 example: 'A vaga é para um engenheiro de software com experiência em desenvolvimento full-stack, especializado em React e Node.js.'
 *                 description: Detalhes adicionais sobre a vaga para ajudar a gerar perguntas relevantes.
 *               userid:
 *                 type: integer
 *                 example: 1
 *                 description: O identificador único do usuário para o qual as perguntas estão sendo geradas.
 *     responses:
 *       200:
 *         description: Perguntas de entrevista geradas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: string
 *                   description: As perguntas de entrevista geradas para o cargo.
 *       400:
 *         description: Requisição inválida, informações insuficientes fornecidas.
 *       500:
 *         description: Erro interno do servidor ou falha ao se comunicar com a API da OpenAI.
 */

///...commit por cima

//@ts-ignore
export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }
    //....
    const { jobTitle, jobDetails, userid } = await req.json();
  
    const requestBodyOpenAI = {
        model: "gpt-3.5-turbo-16k",
        messages: [
            {
                role: "system",
                content: `Você é um recrutador que precisa criar uma lista de perguntas para entrevistar candidatos para a posição de ${jobTitle}. A descrição da vaga é: ${jobDetails}.`
            },
            {
                role: "user",
                content: `Crie uma lista de 6 questões para uma entrevista de emprego para a vaga de ${jobTitle} com a descrição: "${jobDetails}". As questões devem incluir uma pergunta introdutória, uma pergunta situacional, duas perguntas comportamentais e duas perguntas técnicas.`
            },
        ],
        temperature: 0.5,
        max_tokens: 800,
        n: 1,
        stop: null
    };
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBodyOpenAI, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
    
        const generatedQuestions = response.data.choices[0].message.content.trim().split('\n\n').slice(1); // Ignora a primeira parte
        //@ts-ignore
        const questionsObj = generatedQuestions.reduce((acc, curr, index) => {
            acc[`question${index + 1}`] = curr;
            return acc;
        }, {});

        // Adicionando a question0 manualmente
        questionsObj['question0'] = "Oi, me chamo Júlia. Sou recrutadora da candidatura da vaga de " + jobTitle + ". Me conte um pouco sobre você e sua experiência no mercado.";

        // Inserindo as perguntas no banco de dados usando Prisma
        const interviewLogEntry = await prisma.interviewlog.create({
            data: {
                ...questionsObj,
                userid: userid,
                jobstitle: jobTitle,
                jobsdetail: jobDetails,
                // Substitua pelo ID do usuário correto conforme sua lógica de aplicação
                // Adicione quaisquer outros campos necessários da sua tabela `interviewlogs` aqui
            }
        });
        // questionsObj['interviewLogId'] = interviewLogEntry.id;


        return new NextResponse(JSON.stringify({
            status: 'success',
            questions: questionsObj,
            interviewLogId: interviewLogEntry.id // Inclui o ID da entrada inserida no response
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Erro ao fazer chamada para a API da OpenAI ou ao inserir no banco:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
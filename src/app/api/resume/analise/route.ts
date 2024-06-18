import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/services/openai";
import { sleep } from "openai/core.mjs";
import { prisma } from "@/services/database";
import { link } from "fs";


// src/app/api/resume/analise
/**
 * @swagger
 * /api/resume/analise:
 *   post:
 *     summary: Obtém feedback sobre um currículo
 *     description: Este endpoint cria uma thread, envia um conteúdo incluindo o ID de um arquivo de currículo, e retorna feedback do assistente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Identificador único do usuário.
 *               name:
 *                 type: string
 *                 description: Nome do usuário para personalização da mensagem.
 *               TextoCurriculo:
 *                 type: string
 *             example:
 *               userId: 123
 *               name: "João"
 *               TextoCurriculo: Pedro Silva é um Engenheiro de Software com mais de 5 anos de experiência, especializado em JavaScript, React, Node.js, e Python, liderou equipe no desenvolvimento de aplicações web, melhorando eficiência do sistema em 30%, formado em Engenharia de Software pela Universidade Federal de Tecnologia, com habilidades em Docker, Git, Jenkins, AWS, e fluente em Inglês.
 *     responses:
 *       '200':
 *         description: Feedback obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da mensagem.
 *                       role:
 *                         type: string
 *                         description: Papel do autor da mensagem (usuário ou assistente).
 *                       content:
 *                         type: string
 *                         description: Conteúdo da mensagem, incluindo o feedback detalhado do assistente.
 *       '500':
 *         description: Erro ao processar o pedido de feedback.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro ocorrido.
 */

export const maxDuration = 300;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, name, TextoCurriculo,link } = body;

        const assistant = "asst_lbkTWTNiCoEfgcY24VfanVtB";

        // Criação de uma nova thread
        const thread = await openai.beta.threads.create();

        const content = `oi, me chamo ${name}. Preciso de um feedback sobre meu currículo. Você pode me dar alguns conselhos baseados nele?
        ${TextoCurriculo}
        `;

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: content,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant,
        });

        let completed = false;
        while (!completed) {
            try {
                const statusRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
                if (statusRun.status === 'completed') {
                    completed = true;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            } catch (error) {
                console.error('Erro ao verificar o status:', error);
                //@ts-ignore
                throw new Error(error);
            }
        }

        const messages = await openai.beta.threads.messages.list(thread.id);
        let messages_assistant = messages.data.filter((message: any) => message.role === "assistant");

        // Prepara o feedback como um string concatenando o valor de todos os textos

        //@ts-ignore
        const feedback = messages_assistant.map(message => message.content.map(content => content.text.value).join("\n")).join("\n\n");

        // Inserção no banco de dados
        //@ts-ignore
        const customerResume = await prisma.customersresumes.create({
            data: {
                userid: userId,
                feedback: feedback,
                link: link
            }
        });


        //@ts-ignore
        return NextResponse.json({ messages: feedback });

    } catch (err: any) {
        console.error(err);
        const error = err as Error;
        return NextResponse.json({ error: error.message });
    }
}
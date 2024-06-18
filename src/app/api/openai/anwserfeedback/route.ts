import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import { sleep } from "@/lib/sleep";
import { openai } from "@/services/openai";
import { formatterFeedback } from "@/lib/formatterFeedback";
import { prisma } from '@/services/database';

export const maxDuration = 300;

// src/app/api/openai/anwserfeedback
export async function POST(req: NextRequest, res: NextResponse){
    try {
        const { title, questions, interviewLogId } = await req.json()

        let feedbacks: Array<Object> = []

        
        for (let i = 0; i < questions.length; i++) {
            //fazer requisicao pro gpt
            await sleep(1500)
            
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo-16k",
            messages: [
                {
                    role: "system",
                    content: `
                        Pergunta: ${questions[i].question} \n 
                        Resposta: ${questions[i].answer} \n
                        Você é um avaliador em uma entrevista de emprego para a posição de ${title}.
                        Siga sempre a mesma formatação por favor.
                        `
                },
                {
                    role: "user",
                    content: `
                    n---\nPor favor, avalie a resposta seguindo este formato:
                        \n**Avaliação da Resposta:**\n [Avaliação da Resposta]
                        \n**Nota para a resposta:**\n [Nota de 1 a 100]
                        \n**Melhoria Sugerida:**\n[Sugestão de melhoria]
                        \n**Resposta Recomendada:**\n[Resposta recomendada]\n---\n
                    `
                }
            ],
            temperature: 0.6,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
            // console.log(response.choices[0].message.content)
            //transformar em objeto
            const feedback = {
                question: questions[i].question,
                answer: questions[i].answer,
                feedback: formatterFeedback(response.data.choices[0].message.content.trim() || ''),
            }
            //adicionar no feedbacks
            feedbacks.push(feedback)
        }
        await prisma.interviewlog.update({
            where: {
                id: interviewLogId, // ID do log da entrevista que você quer atualizar
            },
            data: { //@ts-ignore
                feedbackresponse: feedbacks, // Aqui você passa o array de feedbacks para ser salvo como JSON
            },
        });

        return NextResponse.json({
            status: 'success',
            feedbacks: feedbacks,
        }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 'error',
            //@ts-ignore
            error: err.message || 'Um erro desconhecido ocorreu.',
        }, { status: 500 });
    }
}


export async function PATCH(req: NextRequest){
    try {
        const { id, grade, feedbackresponse } = await req.json()

        const response = await prisma.interviewlog.update({
            where: {
                id: id,
            },
            data: {
                grade: grade,
                feedbackresponse: feedbackresponse
            }
        })

        return NextResponse.json({
            status: 'success',
            response: response
        }, { status: 200 })
    } catch(err) {
        throw NextResponse.json({
            status: 'error',
            //@ts-ignore
            error: err.message || 'Um erro desconhecido ocorreu.',
        }, { status: 500 });
    }
}
import {  NextResponse,NextRequest } from 'next/server';
import { Resend } from 'resend'
import KoalaWelcomeEmail from '@/email-templates/payment-email';
import { prisma } from '@/services/database';
// src/app/api/payment-email
// src/app/api/payment-email
/**
 * @swagger
 * paths:
 *  /api/payment-email:
 *    post:
 *      summary: Envia um email de boas-vindas
 *      tags:
 *        - Email
 *      description: >
 *        Envia um email de boas-vindas personalizado para o usuário utilizando a plataforma Resend.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userEmail
 *              properties:
 *                userEmail:
 *                  type: string
 *                  format: email
 *                  description: O email do destinatário ao qual o email de boas-vindas será enviado.
 *      responses:
 *        '200':
 *          description: Email enviado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: string
 *                    description: Detalhes da resposta do serviço de email.
 *        '400':
 *          description: Requisição inválida. Pode ocorrer se o userEmail não for fornecido ou for inválido.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Mensagem de erro explicando o motivo da falha.
 *        '500':
 *          description: Erro interno do servidor.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: Mensagem de erro explicando o problema interno.
 */


const resend = new Resend(process.env.EMAIL_API_KEY);

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      
      const { userEmail } = body;


      const user = await prisma.users.findUnique({
        where: {
            email: userEmail,
        },
    });

    
  
      if (!userEmail) {
        return NextResponse.json({ error: "Email do destinatário não fornecido." }, { status: 400 });
      }
  
      const data = await resend.emails.send({ 
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: [userEmail],
        subject: `Olá ${user?.name} a equipe Jobeiros agradece pela compra,`,
        react: KoalaWelcomeEmail({ userFirstname: user?.name || 'Visitante' }),
      });
  
      return NextResponse.json({ data });
  
    } catch (e) {
        //@ts-ignore
      return NextResponse.json({ error: e.message || 'Ocorreu um erro desconhecido.' }, { status: 500 });
    }
  }
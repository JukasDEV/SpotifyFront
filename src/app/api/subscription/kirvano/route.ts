import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/services/database";
import axios from 'axios';

//adicionar sempre a next_public_url no .env e tambem get-url.ts
export async function POST(req: NextRequest, res: NextResponse) {
    
        const webhook = await req.json()

        try {
            console.log("Webhook da kirvano: ", webhook)

            const orderStatus = webhook.event
            const customer = webhook.customer
            const product = webhook.products[0]
            const offer_id = webhook.products[0].offer_id

            const values = await prisma.plans.findFirst({
                where: {
                    offer_id: offer_id,
                },
            });

            //update no usuario where email = customer.email
            const user = await prisma.users.findFirst({
                where: {
                    email: customer.email,
                },
            });

            const statusUpgrow = ["SALE_APPROVED", "SUBSCRIPTION_RENEWED"]

            const statusDowngrow = ["SUBSCRIPTION_CANCELED", "SALE_REFUNDED", "SALE_CHARGEBACK", "SUBSCRIPTION_EXPIRED"]
            
            if(statusUpgrow.includes(orderStatus)){ 
                console.log("Status: ", orderStatus)

                // const sendEmail = await axios.post('/api/payment-email', {
                //     userEmail: customer.email,
                // })

                const updateUser = await prisma.users.update({
                    where: {
                        id: user?.id
                    },
                    data: {
                        credits_interview: values?.credits_interview || 4,
                        credits_resume: values?.credits_resume || 4,
                        credits_analyze: values?.credits_analyze || 4,
                        plan: values?.name.includes("S") || values?.name.includes("s") ? "STARTER" : "PRO" 
                    }
                });

                console.log("Usuario atualizado!", user)
                // console.log("Email de compra enviado com sucesso!", sendEmail.data)
                                
            } else if(statusDowngrow.includes(orderStatus)) {
                console.log("Nao pago! Status: ", orderStatus)
                const updateUser = await prisma.users.update({
                    where: {
                        id: user?.id
                    },
                    data: {
                        credits_interview: 0,
                        credits_resume: 0,
                        credits_analyze: 0,
                        plan: "FREE", 
                    }
                });

            } else {
                console.log(`Evento enviado por ${customer.email} não é um evento de upgrade ou downgrade: ${orderStatus}`)
            }
            return NextResponse.json({
                status: 'success',
                message: `Pagamento de ${customer.email} do plano ${product.offer_name} recebido com sucesso`
            })
        } catch (error) {
            console.log("User: ", webhook.customer.email)
            console.log("Erro no webhook da kirvano: ", error)
            return NextResponse.json({
                status: 'error',
                error
            })
        }
    
}


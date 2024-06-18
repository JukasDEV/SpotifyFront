"use client"
import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderNav,
    DashboardPageHeaderTitle,
    DashboardPageMain,
  } from '@/components/app/page'

import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {Icon} from '@iconify/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useInterview } from '@/context/interview.context'
import axios from 'axios'
import Cookies from 'cookies-js'
import { useUser } from '@/context/user.context'
import { toast } from '@/components/ui/use-toast'
import { reduzirTicket } from '@/services/user/reduzirTicket'
import { sleep } from '@/lib/sleep'
import { useWorkflow } from '@/context/workflow.context'
import { getUser } from '@/services/user/getUser'
import ModalUpgrade from '../_components/modal-upgrade'


export default function Page(){
    const {currentJobTitle, setCurrentJobTitle, currentJobDescription, setCurrentJobDescription, setQuestions, questions} = useInterview()
    const {setIsModalUpgradeActive} = useWorkflow()
    const [isContinueting, setIsContinueting] = useState<boolean>(false)
    const {user, setUser} = useUser()

    const handleContinue = async () => {
        Cookies.expire('questions');
        sessionStorage.removeItem('questions');
        if(user.credits_interview < 1 || !user.credits_interview){
            setIsModalUpgradeActive(true)
            toast({
                variant: "destructive",
                title: "Creditos de entrevista insuficientes",
                description: "Faça upgrade ou adquira creditos de entrevista para continuar.",
                duration: 5000
            })
            await sleep(3000)
            window.location.href = '/app/plans'
        } else {
            setIsContinueting(true)
            await reduzirTicket(user, {
                qtd_interview: 1,
                qtd_analyze: 0,
                qtd_resume: 0,
            })
            sessionStorage.removeItem('feedbacks'); 
            const currentUser = await getUser(user.id)
            setUser(currentUser)
            Cookies.set('currentJobTitle', currentJobTitle)
            const userId = Cookies.get('userid');
            try {
                const response = await axios.post('/api/openai', {
                    jobTitle: currentJobTitle, 
                    jobDetails: currentJobDescription, 
                    userid: parseInt(userId, 10)
                });
        
                const questionsResponse = response.data.questions;
                const interviewId = response.data.interviewLogId;
                Cookies.set('interviewId', interviewId);
                console.log(questionsResponse);
        
                let questionsAux = questions.map((q: any, i: number) => {
                        return {
                            ...q,
                            question: questionsResponse[`question${i}`]
                        };
                });
        
                setQuestions(questionsAux);
                Cookies.set('questions', JSON.stringify(questionsAux));
                sessionStorage.setItem('questions', JSON.stringify(questionsAux));
                setIsContinueting(false);
    
                window.location.href = '/app/interview/questions';
                return response;
            } catch (err) {
                setIsContinueting(false);
                throw err;
            }
        }
    };

    return (
        <DashboardPage>
        <DashboardPageMain>
          <div className='flex flex-col justify-start'>
                <div className='flex flex-col justify-start'>
                    <h1>
                        Adicione a descrição da vaga
                    </h1>
                    <div className='flex flex-col gap-6'>
                        <div className="flex flex-col justify-start gap-2">
                            <Label className='text-[14px]'>
                                Qual o <strong>titulo da vaga</strong> no qual está se candidatando?
                            </Label>
                            <Input type="text" className='pt-6 pb-6' placeholder='Engenheiro de software' value={currentJobTitle} onChange={(e)=>{
                                
                                setCurrentJobTitle(e.target.value)
                                }}/>
                        </div>
                        <div className='flex flex-col justify-start gap-2'>
                            <Label className='text-[14px]'>
                                Qual é a <strong>descrição</strong> para {currentJobTitle ? currentJobTitle : 'vaga'}?
                            </Label>
                            <Textarea className='resize-none !text-[16px]' rows={8} placeholder='Descrição da vaga' value={currentJobDescription} onChange={(e)=>{setCurrentJobDescription(e.target.value)}}/>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Link href='/app'>
                                <Button variant="secondary">
                                    Cancelar
                                </Button>
                            </Link>
                            <div className='flex items-center justify-center gap-2'>
                                <Button className='font-bold flex items-center gap-2' onClick={handleContinue} disabled={isContinueting || (!currentJobTitle || !currentJobDescription)}>
                                    {isContinueting ?  
                                        (
                                            <>
                                                <Icon icon="eos-icons:loading" />
                                                Aguarde...
                                            </>
                                        )
                                        : 
                                        'Continuar'
                                    }
                                    
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

          </div>
        </DashboardPageMain>
      </DashboardPage>
    )
}
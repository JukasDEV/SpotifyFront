"use client"
import {
    DashboardPage,
    DashboardPageMain,
  } from '@/components/app/page'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useInterview } from '@/context/interview.context';
import { formatterData } from '@/lib/formatterData';
import CirclePercentage from './_components/circle-percentage';
import { useEffect, useState } from 'react';
import { Caption } from './_components/caption';
import QuestionAnalyzedCard from './_components/question-analyzed-card';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Loading from '@/components/loading';
import Cookies from 'cookies-js';


export default function Page(){
    const { currentJobTitle, questions, setCurrentJobTitle } = useInterview()
    const [percentage, setPercentage] = useState<any>(0)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [feedbackList, setFeedbackList] = useState<Array<{
        question: string,
        answer: string,
        feedback: {
            NotaDaResposta: string,
            MelhoriaSugerida: string,
            RespostaRecomendada: string
        }
    }>>([])

    useEffect(() => {
        const jobTitleCached = Cookies.get('currentJobTitle')
        setCurrentJobTitle(jobTitleCached)
        
        // const cached = Cookies.get('questions')
        const cached = sessionStorage.getItem('questions')
        const toMethod = {
            title: jobTitleCached,
            questions: cached && JSON.parse(cached)
        }

        const feedbacksStoraged = sessionStorage.getItem('feedbacks')
        
        if(feedbacksStoraged){
            if(JSON.parse(feedbacksStoraged).length == 0){
                handleFeedback(toMethod)
            } else {
                setFeedbackList(JSON.parse(feedbacksStoraged))
                setIsLoading(false)
            }
        } else {
            handleFeedback(toMethod)
        }

    }, [])

    const calcularNotaMedia = async () => {
        let media = 0
        for(let i = 0; i < feedbackList.length; i++){
            if(feedbackList[i].feedback.NotaDaResposta.length > 0){
                const notaAtual = parseInt(feedbackList[i].feedback.NotaDaResposta.replace('/100', ''), 10)
                if(!Number.isNaN(notaAtual)){
                    media = media + notaAtual
                }
            }
        }        
        setPercentage(Math.round(media / feedbackList.length));
    }
    

    useEffect(() => {
        calcularNotaMedia()
    }, [feedbackList])

    useEffect(() => {
        handleUpdateGradeOnDatabase()
    }, [percentage])

    const handleUpdateGradeOnDatabase = async () => {
        try {
            const feedbacks = sessionStorage.getItem('feedbacks');
            const feedbackResponse = feedbacks ? JSON.parse(feedbacks) : null;

            const response = await axios.patch('/api/openai/anwserfeedback', {
                id: parseInt(Cookies.get('interviewId'), 10),
                grade: percentage,
                feedbackresponse: feedbackResponse
            });

            return response
        } catch (err) {
            console.error("Erro ao salvar nota média:", err);
            throw err;
        }
    }

    const handleFeedback = async (toMethod: { title: string, questions: Array<Object> }) => {
        try {
            const interviewId = Cookies.get('interviewId');
            const response = await axios.post('/api/openai/anwserfeedback', {
                title: toMethod.title,
                questions: toMethod.questions,
                interviewLogId: parseInt(interviewId, 10),
                
            });
    
            const listaFeedbacks = response.data.feedbacks;
            setFeedbackList(listaFeedbacks); 
            sessionStorage.setItem('feedbacks', JSON.stringify(listaFeedbacks)); 
        } catch (err) {
            console.error("Erro ao salvar feedbacks:", err);
            throw err;
        }
    };

    useEffect(() => {
        if (feedbackList.length > 0 && typeof percentage === 'number' && percentage > 0) {            
            setIsLoading(false)
            // Dispara a animação de confetes
            confetti({
                particleCount: 150,
                spread: 160,
                origin: { y: 0.6 }
            });
        }
    }, [percentage]);

    const handleSalvar = () => {
        Cookies.expire('currentJobTitle')
        Cookies.expire('questions')
        Cookies.expire('feedbacks')
        sessionStorage.removeItem('feedbacks')
        sessionStorage.removeItem('questions')
        window.location.href = '/app'
    }
    
    return (
        <DashboardPage>
        <DashboardPageMain className='flex flex-col gap-6'>
            <div className="flex flex-col gap-8">
                <div className='flex items-center gap-2 justify-between'>
                    <div className='flex items-center gap-2'>
                        <Button variant="secondary">
                            Questões
                        </Button>
                        
                        <Button variant="default"  onClick={()=>{}}>
                            Revisar
                        </Button>
                    </div>
                    
                        <Button variant="default" onClick={handleSalvar}>
                            Salvar
                        </Button>
                    
                </div>
                {isLoading || (!feedbackList || feedbackList.length == 0 && (typeof percentage != 'number' || percentage == 0) && percentage != 'NaN') ?
                <div className=''>
                    <Loading/>
                </div> :
                <>
                    <Card className='flex flex-col items-center justify-center p-10 '>
                        <CardTitle className='opacity-90 font-bold'>
                            Entrevista {currentJobTitle ? ` para ${currentJobTitle}` : " de emprego com IA"}
                        </CardTitle>
                        <CardDescription>
                                {formatterData(new Date())}
                        </CardDescription>

                        <CardContent className='w-full flex flex-col items-center justify-center pt-8'>
                            <div className={`w-full flex flex-col h-[50px] gap-6 p-14 rounded items-center justify-center relative ${percentage < 50 ? `bg-red-100` : percentage < 75 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                            

                            <span className="absolute flex h-3 w-3 top-0 right-7" style={{zIndex: 999}}>
                                <Caption/>
                            </span>

                                
                                <CirclePercentage percentage={percentage} />
                                

                                <span className={`font-semibold text-[14px] ${percentage < 50 ? `text-red-600` : percentage < 75 ? 'text-yellow-600' : 'text-green-600'} text-center`}>
                                    {percentage < 50 ? 'Precisa de melhorias' : percentage < 75 ? 'Bom, mas pode melhorar algumas coisas' : 'Excelente! Você está no caminho certo.'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                
                </>
                }
                
            </div>
            {!isLoading && feedbackList.length > 0 && 
                <div className='w-full flex flex-col gap-4'>
                    {feedbackList.map((feedback: any) => {
                        return (
                            <QuestionAnalyzedCard obj={feedback} />
                        )
                    })}
                </div>
            }
                
            
                
        </DashboardPageMain>
      </DashboardPage>
    )
}
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/app/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Interview } from "../page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterDataString } from "@/lib/formatterData";
import { Caption } from "../../interview/review/_components/caption";
import CirclePercentage from "../../interview/review/_components/circle-percentage";
import QuestionAnalyzedCard, { AlertCircleIcon, CheckCircleIcon, LightbulbIcon } from "../../interview/review/_components/question-analyzed-card";

import CardLoadingInterviewAnalyzed from "../_components/card-loading-interview-analyzed";

export default function Page({ params }: { params: { interviewid: string } }) {
    const [interview, setInterview] = useState<Interview>()

    const fetchInterview = async () => {
        const response = await axios.get(`/api/interview/${params.interviewid}`);
        setInterview(response.data);
        console.log(typeof response.data.feedbackresponse)
        return response.data
    }

    useEffect(() => {
        fetchInterview()
    }, [])

  if (!interview) return <CardLoadingInterviewAnalyzed/>

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>
          Entrevista para a vaga: <strong>{interview.jobstitle}</strong> {/* Exemplo de acesso a uma propriedade */}
        </DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <Link href="/app/my-interviews">
            <Button>Voltar</Button>
          </Link>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain className="flex flex-col gap-4">
        <Card className='flex flex-col items-center justify-center p-10'>
            <CardTitle className='opacity-90 font-bold'>
                Entrevista  para {interview.jobstitle}
            </CardTitle>
            <CardDescription>
                    {formatterDataString(interview.datelog)}
            </CardDescription>

                <CardContent className='w-full flex flex-col items-center justify-center pt-8'>
                    <div className={`w-full flex flex-col h-[50px] gap-6 p-14 rounded items-center justify-center relative ${interview.grade < 50 ? `bg-red-100` : interview.grade < 75 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                    

                    <span className="absolute flex h-3 w-3 top-0 right-7" style={{zIndex: 999}}>
                        <Caption/>
                    </span>

                        
                        <CirclePercentage percentage={interview.grade} />
                        

                        <span className={`font-semibold text-[14px] ${interview.grade < 50 ? `text-red-600` : interview.grade < 75 ? 'text-yellow-600' : 'text-green-600'} text-center`}>
                            {interview.grade < 50 ? 'Precisa de melhorias' : interview.grade < 75 ? 'Bom, mas pode melhorar algumas coisas' : 'Excelente! Você está no caminho certo.'}
                        </span>
                    </div>
                </CardContent>
            </Card>
            {/* @ts-ignore */}
            {interview.feedbackresponse.map((feedback: any) => {
                return (
                    <QuestionAnalyzedCard obj={feedback} />
                )
            })}
      </DashboardPageMain>
    </DashboardPage>
  );
}


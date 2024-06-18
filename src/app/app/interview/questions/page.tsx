"use client"
import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderNav,
    DashboardPageHeaderTitle,
    DashboardPageMain,
  } from '@/components/app/page'
import { Button } from '@/components/ui/button'
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import Question, { QuestionType } from './_components/question'
import { useInterview } from '@/context/interview.context'
import Cookies from 'cookies-js'


export default function Page(){
        const {questions, setQuestions} = useInterview()

        useEffect(() => {
            const questionsCached = Cookies.get('questions')
            console.log(JSON.parse(questionsCached))
            if(questionsCached){
                setQuestions(JSON.parse(questionsCached))
            }
        }, [])

        const handleReview = async () => {
            Cookies.set('questions', JSON.stringify(questions))
            sessionStorage.setItem('questions', JSON.stringify(questions))
            window.location.href = '/app/interview/review'
        }

        const allQuestionsAnswered = questions.every((question: any) => question.awnser && question.awnser.trim() !== '');

    return (
        <DashboardPage>
            <DashboardPageMain className='flex flex-col gap-40'>
                <div className='flex items-center gap-2 justify-start'>
                    {questions.map((question: { active: any; title: any }) => {
                        return (
                            <Button variant={question.active ? 'default' : 'secondary'}>
                                {question.title}
                            </Button>
                        )
                    })}
                    <Button variant="secondary" disabled={!allQuestionsAnswered} onClick={handleReview}>
                        Revisar
                    </Button>
                </div>
                <div>
                    <Question {...(questions.find((q: any) => q.active))}/>
                </div>
            </DashboardPageMain>
        </DashboardPage>
    )
}
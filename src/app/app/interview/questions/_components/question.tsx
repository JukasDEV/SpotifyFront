"use client"
import React, { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from '@iconify/react';
import { useInterview } from "@/context/interview.context";
import Cookies from "cookies-js"; 
import { sleep } from "@/lib/sleep";

export type QuestionType = {
    title: string,
    color: string,
    type: string,
    question: string,
    active: boolean,
    answer?: string,
    textColor: string,
}

const Question = ({ title, type, question, active, answer, color, textColor }: QuestionType) => {
    const [typing, setTyping] = useState(false);
    const { questions, setQuestions } = useInterview();
    const [typingAnimationCompleted, setTypingAnimationCompleted] = useState(false);
    const [displayedText, setDisplayedText] = useState("");

    // Lógica para animação de digitação
    useEffect(() => {
        let currentCharIndex = 0;
        setDisplayedText("");
        setTypingAnimationCompleted(false);

        const typeChar = () => {
            if (currentCharIndex < question.length) {
                setDisplayedText((prev) => prev + question[currentCharIndex]);
                currentCharIndex++;
                setTimeout(typeChar, 30); // Velocidade de digitação
            } else {
                setTypingAnimationCompleted(true); // Animação concluída
            }
        };

        typeChar();
    }, [question]); // Dependência [question] para reiniciar a animação quando a pergunta mudar

    // Animação de expansão para a área de texto
    const expandAnimation = useSpring({
        height: typing ? 150 : 0,
        opacity: typing ? 1 : 0,
        from: { height: 0, opacity: 0 },
        config: { tension: 250, friction: 20 },
    });

    const handleNextQuestion = () => {
        const currentIndex = questions.findIndex((q: any) => q.active);
        if (currentIndex !== -1 && currentIndex < questions.length - 1) {
            const updatedQuestions = questions.map((q:any, index:any) => ({
                ...q,
                active: index === currentIndex + 1,
            }));
            setQuestions(updatedQuestions);
        }
    };

    const handlePreviousQuestion = () => {
        const currentIndex = questions.findIndex((question: any) => question.active);
        if (currentIndex > 0) {
            const updatedQuestions = questions.map((q:any, index:any) => ({
                ...q,
                active: index === currentIndex - 1,
            }));
            setQuestions(updatedQuestions);
        }
    };

    const handleReview = async () => {
        console.log(questions)
        Cookies.set('questions', JSON.stringify(questions));
        sessionStorage.setItem('questions', JSON.stringify(questions));
        await sleep(400)
        window.location.href = '/app/interview/review';
    };

    useEffect(() => {
        console.log(questions)
    }, [questions]);

    const allQuestionsAnswered = questions.every((question: any) => question.answer && question.answer.trim() !== '');

    return (
        <div className="flex flex-col items-center gap-12 justify-center">
            <span style={{ background: color, color: textColor }} className="text-[12px] p-1 px-2 rounded-2xl">{type}</span>

            <Card className="w-full flex flex-col items-start gap-6 justify-start p-5">
                <CardTitle className="flex items-center gap-2">
                    <Icon icon="lucide:audio-lines" style={{ color: textColor }} className="!text-[32px]" />
                    <span className={`leading-normal`}>
                        {question[0]}{displayedText.replace('undefined', '')}
                    </span>
                </CardTitle>
                <CardContent className="w-full">
                    <animated.div style={expandAnimation}>
                        {typing && (
                            <Textarea rows={6} className="border-none w-full pt-6 pb-6 resize-none" placeholder="Digite sua resposta..." value={answer ?? ''} onChange={(e) => {
                                const questionIndex = questions.findIndex((q: any) => q.question === question);
                                if (questionIndex !== -1) {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex] = {
                                        ...updatedQuestions[questionIndex],
                                        answer: e.target.value,
                                    };
                                    setQuestions(updatedQuestions);
                                }
                            }} />
                        )}
                    </animated.div>
                </CardContent>
                <div className="flex items-center gap-2 justify-between w-full">
                    {!typing ?
                        <Button className="flex items-center gap-2" onClick={() => setTyping(!typing)} disabled={!typingAnimationCompleted}>
                            <Icon icon="material-symbols:keyboard" />
                            Responder
                        </Button> :
                        <Button className="flex items-center gap-2" onClick={() => setTyping(!typing)}>
                            Feito
                        </Button>
                    }
                    <div className="flex items-center gap-2">
                        <Button variant="outline" disabled={questions[0].active || !typingAnimationCompleted} onClick={handlePreviousQuestion}>
                            Anterior
                        </Button>
                        {questions[questions.length - 1].active ?
                            <Button onClick={handleReview} disabled={!allQuestionsAnswered}>
                                Revisar
                            </Button> :
                            <Button variant="outline" disabled={!typingAnimationCompleted || !answer} className="cursor-pointer" onClick={handleNextQuestion}>
                                Próxima
                            </Button>
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Question;

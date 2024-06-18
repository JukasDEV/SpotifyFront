"use client"
import { QuestionType } from '@/app/app/interview/questions/_components/question';
import React, { createContext, useState, useContext } from 'react';


const InterviewContext = createContext<any | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<Array<QuestionType>>([
        {
            title: 'Q1',
            type: 'Pergunta de Introdução',
            color: '#C6C8FF',
            textColor: "#16398B",
            question: "",
            active: true,
        },
        {
            title: 'Q2',
            type: 'Pergunta Situacional',
            color: '#99F6E4',
            textColor: "#134E4A",
            question: "",
            active: false
        },
        {
            title: 'Q3',
            type: 'Pergunta Comportamental',
            color: '#FBCFE8',
            textColor: "#831843",
            question: "",
            active: false
        },
        {
            title: 'Q4',
            type: 'Pergunta Comportamental',
            color: '#FBCFE8',
            textColor: "#831843",
            question: "",
            active: false
        },
        {
            title: 'Q5',
            type: 'Pergunta Técnica',
            color: '#FDE68A',
            textColor: "#78350F",
            question: "",
            active: false
        }, 
        {
            title: 'Q6',
            type: 'Pergunta Técnica',
            color: '#FDE68A',
            textColor: "#78350F",
            question: "",
            active: false
        }
    ])

    const [currentJobTitle, setCurrentJobTitle] = useState<string>()
    const [currentJobDescription, setCurrentJobDescription] = useState<string>()
    
    return (
        <InterviewContext.Provider value={{ 
            questions, setQuestions,
            currentJobTitle, setCurrentJobTitle,
            currentJobDescription, setCurrentJobDescription
            }}>
            {children}
        </InterviewContext.Provider>
    );
};

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error('useInterview must be used within a InterviewProvider');
    }
    return context;
};

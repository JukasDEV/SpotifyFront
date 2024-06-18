"use client"
import { Achievement, Education, Experience, Skill } from '@/app/app/curriculo-builder/building/_components/resume-data';
import { QuestionType } from '@/app/app/interview/questions/_components/question';
import React, { createContext, useState, useContext } from 'react';

export type Resume = {
    profile: {
        name: string;
        email: string;
        phone: string;
        location: string;
        summary: string;
        linkedin: string;
        portfolio?: string;
    };
    experiences: Array<Experience>;
    educations: Array<Education>;
    skills: Array<Skill>;
    achievements: Array<Achievement>;
}


const ResumeContext = createContext<any | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [myResume, setMyResume] = useState<Resume>({
        profile: {
            name: 'Jobeiros',
            email: 'jobeiros@jobeiros.com',
            phone: '(99) 99999-9999',
            location: 'Rio de Janeiro, Brasil',
            summary: 'Apaixonado por currículos feitos com a plataforma do Jobeiros, no qual, é possível criar currículos de forma simples e rápida.',
            linkedin: 'https://www.linkedin.com/in/',
            portfolio: ''
        },
        experiences: [
            {
                isCurrent: true,
                summary: 'Desenvolvimento de aplicações web e mobile',
                title: 'Desenvolvedor Fullstack',
                startDate: {
                    month: 4,
                    year: 2023
                },
                company: {
                    name: 'Empresa XYZ'
                }
            }
        ],
        educations: [
            {
                degree: 'Bacharelado',
                fieldOfStudy: 'Engenharia da Computação',
                notes: 'Projeto acadêmico: Desenvolvimento de um sistema de gestão de vendas',
                schoolName: 'IBMEC - RJ',
                startDate: {
                    year: 2022
                },
                endDate: {
                    year: 2024
                }
            }
        ],
        skills: [
            {
                name: 'Excel Avançado'
            },
            {
                name: 'Pacote Office'
            },
            {
                name: 'Javascript'
            }
        ],
        achievements: [
            {
                issuer: 'Curso X',
                name: 'Certificado de Excel Avançado',
            }
        ]
    })
    
    return (
        <ResumeContext.Provider value={{ 
            myResume, setMyResume
            }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

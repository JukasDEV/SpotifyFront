"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/resume.context';
import { Education } from './resume-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';


//nome

export default function EducationForm() {
  const {myResume, setMyResume} = useResume()
    
  return (
    <Card className='rounded'>
      <CardHeader>
        <CardTitle>
            Informações de Educação
        </CardTitle>
        <CardDescription>
            Preencha as informações de sua educação
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
      {myResume.educations.map((education: Education, index: number) => {
            return (
                <div className='flex flex-col gap-4' key={index}>
                <div className='flex flex-col gap-1'>
                    <Label>Área de Estudo</Label>
                    <Input 
                    placeholder='Área de Estudo' 
                    value={education.fieldOfStudy} 
                    onChange={(e) => {
                        // Atualiza o campo fieldOfStudy do item específico
                        const updatedFieldOfStudy = e.target.value;
                        const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                        if (eduIndex === index) {
                            return { ...edu, fieldOfStudy: updatedFieldOfStudy };
                        }
                        return edu;
                        });
                        setMyResume({ ...myResume, educations: updatedEducations });
                    }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Grau de Educação</Label>
                    <Input 
                    placeholder='Grau de Educação' 
                    value={education.degree} 
                    onChange={(e) => {
                        // Atualiza o campo degree do item específico
                        const updatedDegree = e.target.value;
                        const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                        if (eduIndex === index) {
                            return { ...edu, degree: updatedDegree };
                        }
                        return edu;
                        });
                        setMyResume({ ...myResume, educations: updatedEducations });
                    }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Nome da Instituição</Label>
                    <Input 
                    placeholder='Nome da Instituição' 
                    value={education.schoolName} 
                    onChange={(e) => {
                        // Atualiza o campo schoolName do item específico
                        const updatedSchoolName = e.target.value;
                        const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                        if (eduIndex === index) {
                            return { ...edu, schoolName: updatedSchoolName };
                        }
                        return edu;
                        });
                        setMyResume({ ...myResume, educations: updatedEducations });
                    }}
                    />
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                    <Label>Data de Início</Label>
                    <Input 
                        placeholder='Ano de Início' 
                        type='number'
                        value={education.startDate.year.toString()} 
                        onChange={(e) => {
                        // Atualiza o campo startDate.year do item específico
                        const updatedStartDate = e.target.value;
                        const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                            if (eduIndex === index) {
                            return { ...edu, startDate: { ...edu.startDate, year: updatedStartDate }};
                            }
                            return edu;
                        });
                        setMyResume({ ...myResume, educations: updatedEducations });
                        }}
                    />
                    </div>
                    <div className='flex flex-col gap-1'>
                    <Label>Data de Término</Label>
                    <Input 
                        placeholder='Ano de Término' 
                        type='number'
                        value={education.endDate.year.toString()} 
                        onChange={(e) => {
                        // Atualiza o campo endDate.year do item específico
                        const updatedEndDate = e.target.value;
                        const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                            if (eduIndex === index) {
                            return { ...edu, endDate: { ...edu.endDate, year: updatedEndDate }};
                            }
                            return edu;
                        });
                        setMyResume({ ...myResume, educations: updatedEducations });
                        }}
                    />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Notas</Label>
                    <Textarea
                        rows={5} 
                        placeholder='Notas' 
                        value={education.notes} 
                        onChange={(e) => {
                            // Obtém o valor atualizado do textarea
                            let updatedNotes = e.target.value;

                            // Divide o valor atualizado em linhas
                            let lines = updatedNotes.split('\n');

                            // Processa cada linha para garantir que comece com um hífen, exceto a primeira linha e linhas vazias
                            lines = lines.map((line, index) => {
                                // Não adiciona hífen à primeira linha ou se a linha estiver vazia
                                if (index !== 0 && line !== "" && !line.startsWith('-')) {
                                    return `-${line}`;
                                }
                                return line;
                            });

                            // Reconstrói o valor de notas
                            updatedNotes = lines.join('\n');

                            // Atualiza o campo notes do item específico
                            const updatedEducations = myResume.educations.map((edu: Education, eduIndex: number) => {
                                if (eduIndex === index) {
                                    return { ...edu, notes: updatedNotes };
                                }
                                return edu;
                            });

                            // Atualiza o estado com as novas informações de educação
                            setMyResume({ ...myResume, educations: updatedEducations});
                        }}
                    />
                </div>
                {myResume.educations.length > 1 && index > 0 && 
                    <Button onClick={()=>{
                    setMyResume({
                        ...myResume,
                        educations: myResume.educations.filter((_: Education, eduIndex: number) => eduIndex !== index)
                    })
                    }}>
                    Remover
                    </Button>
                }
                <DropdownMenuSeparator />
                </div>
            )
            })}
        <Button onClick={()=>{
            setMyResume({
                ...myResume,
                educations: [
                    ...myResume.educations,
                    {
                        degree: '',
                        fieldOfStudy: '',
                        notes: '',
                        schoolName: '',
                        startDate: {
                            year: 0
                        },
                        endDate: {
                            year: 0
                        }
                    }
                ]
            })
        }}>
            Adicionar
        </Button>
      </CardContent>
     
    </Card>
  );
}
  
"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/resume.context';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Experience } from './resume-data';
import { Textarea } from '@/components/ui/textarea';

export default function ExperienceForm() {
  const { myResume, setMyResume } = useResume();

  return (
    <Card className='rounded'>
      <CardHeader>
        <CardTitle>Informações de Experiência</CardTitle>
        <CardDescription>Preencha as informações de sua experiência</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        {myResume.experiences.map((experience: Experience, index: number) => (
          <div className='flex flex-col gap-4' key={index}>
            <div className='flex flex-col gap-1'>
              <Label>Empresa</Label>
              <Input
                placeholder='Empresa'
                value={experience.company.name}
                onChange={(e) => {
                  const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? { ...exp, company: { name: e.target.value } } : exp);
                  setMyResume({ ...myResume, experiences: updatedExperiences });
                }}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Label>Cargo</Label>
              <Input
                placeholder='Cargo'
                value={experience.title}
                onChange={(e) => {
                  const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? { ...exp, title: e.target.value } : exp);
                  setMyResume({ ...myResume, experiences: updatedExperiences });
                }}
              />
            </div>

            <div className='flex flex-row gap-2 justify-between'>
              <div className='flex flex-col gap-1'>
                <Label>Data de Início</Label>
                <Input
                  placeholder='Mês'
                  type="number"
                  value={experience.startDate.month.toString()}
                  onChange={(e) => {
                    const month = parseInt(e.target.value, 10);
                    const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? {
                      ...exp,
                      startDate: { ...exp.startDate, month: month }
                    } : exp);
                    setMyResume({ ...myResume, experiences: updatedExperiences });
                  }}
                />
                <Input
                  placeholder='Ano'
                  type="number"
                  value={experience.startDate.year.toString()}
                  onChange={(e) => {
                    const year = parseInt(e.target.value, 10);
                    const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? {
                      ...exp,
                      startDate: { ...exp.startDate, year: year }
                    } : exp);
                    setMyResume({ ...myResume, experiences: updatedExperiences });
                  }}
                />
              </div>

              {!experience.isCurrent  && (
                <div className='flex flex-col gap-1'>
                  <Label>Data de Término</Label>
                  <Input
                    placeholder='Mês'
                    type="number"
                    value={experience.endDate ? experience.endDate.month : 1}
                    onChange={(e) => {
                      const month = parseInt(e.target.value, 10);
                      const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? {
                        ...exp,
                        endDate: { ...exp.endDate, month: month }
                      } : exp);
                      setMyResume({ ...myResume, experiences: updatedExperiences });
                    }}
                  />
                  <Input
                    placeholder='Ano'
                    type="number"
                    value={experience.endDate ? experience.endDate.year : 2000}
                    onChange={(e) => {
                      const year = parseInt(e.target.value, 10);
                      const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? {
                        ...exp,
                        endDate: { ...exp.endDate, year: year }
                      } : exp);
                      setMyResume({ ...myResume, experiences: updatedExperiences });
                    }}
                  />
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <Label>Descrição</Label>
              <Textarea
                        rows={5} 
                        placeholder='Notas' 
                        value={experience.summary} 
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
                            const updatedExperiences = myResume.experiences.map((exp: Experience, eduIndex: number) => {
                                if (eduIndex === index) {
                                    return { ...exp, summary: updatedNotes };
                                }
                                return exp;
                            });

                            // Atualiza o estado com as novas informações de educação
                            setMyResume({ ...myResume, experiences: updatedExperiences});
                        }}
                    />
            </div>

            <div className='flex gap-2 items-center'>
              <Label>Atual</Label>
              <Switch
                checked={experience.isCurrent}
                onCheckedChange={() => {
                  const updatedExperiences = myResume.experiences.map((exp: Experience, expIndex: number) => expIndex === index ? { ...exp, isCurrent: !exp.isCurrent, endDate: exp.isCurrent ? exp.endDate : {} } : exp);
                  setMyResume({ ...myResume, experiences: updatedExperiences });
                }}
              />
            </div>

            {myResume.experiences.length > 1 && (
              <Button onClick={() => {
                setMyResume({ ...myResume, experiences: myResume.experiences.filter((_: Experience, expIndex: number) => expIndex !== index) });
              }}>
                Remover
              </Button>
            )}
            <DropdownMenuSeparator />
          </div>
        ))}
        <Button onClick={() => {
          setMyResume({
            ...myResume,
            experiences: [...myResume.experiences, {
              isCurrent: false,
              summary: '',
              title: '',
              startDate: { month: 1, year: 2020 }, // Use default or current values
              company: { name: '' },
            }]
          });
        }}>
          Adicionar
        </Button>
      </CardContent>
    </Card>
  );
}

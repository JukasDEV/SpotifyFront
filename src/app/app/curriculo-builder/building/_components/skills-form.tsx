"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/resume.context';
import { Button } from '@/components/ui/button';
import { Skill } from './resume-data'; // Supondo que Skill esteja definido aqui
import { TrashIcon } from '@radix-ui/react-icons';

export default function SkillForm() {
  const { myResume, setMyResume } = useResume();

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = myResume.skills.map((skill: Skill, skillIndex: number) => skillIndex === index ? { ...skill, name: value } : skill);
    setMyResume({ ...myResume, skills: updatedSkills });
  };

  const addSkill = () => {
    setMyResume({
      ...myResume,
      skills: [...myResume.skills, { name: '' }]
    });
  };

  const removeSkill = (index: number) => {
    setMyResume({
      ...myResume,
      skills: myResume.skills.filter((_: Skill, skillIndex: number) => skillIndex !== index)
    });
  };

  return (
    <Card className='rounded'>
      <CardHeader className='text-left w-full flex items-left justify-start'>
        <CardTitle>Habilidades</CardTitle>
        <CardDescription className='flex items-left justify-start !text-left w-full'>Adicione ou remova habilidades</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        {myResume.skills.map((skill: Skill, index: number) => (
          <div className='flex flex-col gap-4 items-left' key={index}>
            <Label>Habilidade</Label>
            <div className='flex items-center gap-1'>
              <Input
                placeholder='Nome da habilidade'
                value={skill.name}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
              <Button onClick={() => removeSkill(index)}>
                <TrashIcon className='w-[10px]'/>
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={addSkill}>
          Adicionar habilidade
        </Button>
      </CardContent>
    </Card>
  );
}

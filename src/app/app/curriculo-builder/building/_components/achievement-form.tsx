"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/resume.context';
import { Button } from '@/components/ui/button';
import { Achievement } from './resume-data'; // Supondo que Achievement esteja definido aqui

export default function AchievementForm() {
  const { myResume, setMyResume } = useResume();

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = myResume.achievements.map((achievement: Achievement, achIndex: number) => 
      achIndex === index ? { ...achievement, [field]: value } : achievement
    );
    setMyResume({ ...myResume, achievements: updatedAchievements });
  };

  const addAchievement = () => {
    setMyResume({
      ...myResume,
      achievements: [...myResume.achievements, { issuer: '', name: '' }]
    });
  };

  const removeAchievement = (index: number) => {
    setMyResume({
      ...myResume,
      achievements: myResume.achievements.filter((_: Achievement, achIndex: number) => achIndex !== index)
    });
  };

  return (
    <Card className='rounded'>
      <CardHeader>
        <CardTitle>Conquistas</CardTitle>
        <CardDescription>Adicione ou remova suas conquistas</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        {myResume.achievements.map((achievement: Achievement, index: number) => (
          <div className='flex flex-col gap-2' key={index}>
            <div className='flex flex-col gap-1'>
              <Label>Emissor</Label>
              <Input
                placeholder='Nome do emissor'
                value={achievement.issuer}
                onChange={(e) => handleAchievementChange(index, 'issuer', e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label>Conquista</Label>
              <Input
                placeholder='Nome da conquista'
                value={achievement.name}
                onChange={(e) => handleAchievementChange(index, 'name', e.target.value)}
              />
            </div>
            <Button onClick={() => removeAchievement(index)}>
              Remover
            </Button>
          </div>
        ))}
        <Button onClick={addAchievement}>
          Adicionar conquista
        </Button>
      </CardContent>
    </Card>
  );
}

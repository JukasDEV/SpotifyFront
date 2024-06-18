"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/resume.context';
import { Textarea } from '@/components/ui/textarea';


//nome

export default function ProfileForm() {
  const {myResume, setMyResume} = useResume()
    
  return (
    <Card className='rounded'>
      <CardHeader>
        <CardTitle>
            Informações Pessoais
        </CardTitle>
        <CardDescription>
            Preencha suas informações pessoais
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <Label>Nome</Label>
          <Input placeholder='Nome' value={myResume.profile.name} onChange={(e)=>{
              setMyResume({
                  ...myResume,
                  profile: {
                      ...myResume.profile,
                      name: e.target.value
                  }
              })
          }}/>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Email</Label>
          <Input placeholder='Email' value={myResume.profile.email} onChange={(e) => {
            setMyResume({
              ...myResume,
              profile: {
                ...myResume.profile,
                email: e.target.value
              }
            })
          }} />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Telefone</Label>
          <Input placeholder='Telefone' mask="(99) 99999-9999" value={myResume.profile.phone} onChange={(e) => {
            setMyResume({
              ...myResume,
              profile: {
                ...myResume.profile,
                phone: e.target.value
              }
            })
          }} />
        </div>

        
        <div className='flex flex-col gap-1'>
          <Label>Endereço</Label>
          <Input placeholder='Location' value={myResume.profile.location} onChange={(e) => {
            setMyResume({
              ...myResume,
              profile: {
                ...myResume.profile,
                location: e.target.value
              }
            })
          }} />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Resumo sobre você</Label>
          <Textarea rows={5} placeholder='Resumo sobre você' value={myResume.profile.summary} onChange={(e) => {
            setMyResume({
              ...myResume,
              profile: {
                ...myResume.profile,
                summary: e.target.value
              }
            })
          }} />
        </div>

        <div className='flex flex-col gap-1'>
        <Label>LinkedIn</Label>
        <Input placeholder='LinkedIn' value={myResume.profile.linkedin} onChange={(e) => {
          setMyResume({
            ...myResume,
            profile: {
              ...myResume.profile,
              linkedin: e.target.value
            }
          })
        }} />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Portfólio</Label>
          <Input placeholder='Portfolio' value={myResume.profile.portfolio} onChange={(e) => {
            setMyResume({
              ...myResume,
              profile: {
                ...myResume.profile,
                portfolio: e.target.value
              }
            })
          }} />
        </div>

      </CardContent>
     
    </Card>
  );
}
  
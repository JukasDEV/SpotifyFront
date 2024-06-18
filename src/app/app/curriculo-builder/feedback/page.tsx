"use client"
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from '@/components/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatterResumeFeedback } from '@/lib/formatterResumeFeedback';

export default function Page(){
  const [analise, setAnalise] = useState<string>('');
  const [typedText, setTypedText] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);

  useEffect(() => {
    const analise = sessionStorage.getItem('resume_analise');
    if (analise) {
      const parsedAnalise = JSON.parse(analise).messages;
      setAnalise(formatterResumeFeedback(parsedAnalise));
      setTyping(true);
    }
  }, []);

  useEffect(() => {
    let index = -1;
    if (typing) {
      const timer = setInterval(() => {
        setTypedText((prev) => prev + analise.charAt(index));
        index++;
        if (index === analise.length) {
          clearInterval(timer);
          setTyping(false);
        }
      }, 10); // Ajuste o intervalo para controlar a velocidade de digitação
      return () => clearInterval(timer);
    }
  }, [analise, typing]);

  const handleVoltar = () => {
    sessionStorage.removeItem('resume_analise');
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Feedback</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <Link href="/app/curriculo-builder">
            <Button onClick={handleVoltar}>Voltar</Button>
          </Link>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <Card>
          <CardHeader>
            <CardTitle>Feedback do seu Currículo</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {/* Usando dangerouslySetInnerHTML para renderizar o HTML */}
              <p dangerouslySetInnerHTML={{ __html: typedText }} /> 
            </div>
          </CardContent>
        </Card>
      </DashboardPageMain>
    </DashboardPage>
  );
}
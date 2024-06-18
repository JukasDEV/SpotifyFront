"use client"
import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderNav,
    DashboardPageHeaderTitle,
    DashboardPageMain,
  } from '@/components/app/page'
  
  

import Link from 'next/link'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import CardAnalyzer from './_components/card-analyzer'
import Info from '@/components/app/info'
import { ModalVideo } from '@/components/app/modal-video'


  
export default function Page() {
    
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
              <span className='flex items-center gap-1 text-[12px] !sm:text-[14px]'>
                Análise de Curriculo
                <Info title="Analise seu Currículo com nossa IA" description='Tenha uma analise precisa e um feedback sincero sobre seu currículo, visando melhora-lo para ser aceito em qualquer vaga.'/>
                <ModalVideo url={"https://www.youtube.com/embed/0CaKXOFFXG4?si=de5Sh0QL2Ybl-RSD"} title="Analise seu Currículo com Jobeiros" description="Tenha uma analise precisa e um feedback sincero sobre seu currículo, visando melhora-lo para ser aceito em qualquer vaga."/>
              </span>
          </DashboardPageHeaderTitle>
          <DashboardPageHeaderNav>
            <CardAnalyzer/>
          </DashboardPageHeaderNav>
        </DashboardPageHeader>
        <DashboardPageMain>
          <div className='w-full h-[80vh] justify-center items-center flex flex-col gap-4'>
            <Icon icon="iconoir:page-search" className="w-[65px] h-[65px] bg-gray-100 text-black rounded-full p-2 text-[36px]" />
            <h2 className="font-bold text-[24px]">
              Analise seu Curriculo
            </h2> 
            <span className="text-center leading-relaxed text-[12px] max-w-[600px]">
              AI CV Analyzer é uma ferramenta para analisar seu currículo usando tecnologia de IA. Ajuda você a refinar seu currículo e ganhar destaque nas próximas candidaturas.
            </span>
            <div className="flex items-center justify-center gap-2">
                <CardAnalyzer/>
            </div>
          </div>
        </DashboardPageMain>
      </DashboardPage>
    )
  }
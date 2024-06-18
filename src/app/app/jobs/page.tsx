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
import { Button } from '@/components/ui/button'
import { DrawingPinIcon, ReaderIcon, RocketIcon } from '@radix-ui/react-icons'
import Info from '@/components/app/info'
import { ModalVideo } from '@/components/app/modal-video'


  
export default function Page() {
    
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
              <span className='flex items-center gap-1 !text-[14px]'>
                Vagas Exclusivas
                <Info title="Vagas Exclusivas para Jobeiros" description='Aplique para vagas exclusivas para os membros do Jobeiros, diminua sua concorrência e aumente suas chances.'/>
                <ModalVideo url={"https://www.youtube.com/embed/6Pix8tMSN6g?si=FnWc4ZZhxPD487aD"} title="Vagas Exclusivas" description="Vagas exclusivas e selecionadas para nossos usuários alavancarem suas carreiras com nossa parceria."/>
              </span>
          </DashboardPageHeaderTitle>
          <DashboardPageHeaderNav>
            <Link href="/app/plans">
            <Button>
                Upgrade
            </Button>
            </Link>
          </DashboardPageHeaderNav>
        </DashboardPageHeader>
        <DashboardPageMain>
          <div className='w-full h-[80vh] justify-center items-center flex flex-col gap-4'>
            <RocketIcon className='w-[65px] h-[65px] bg-gray-100 text-black rounded-full p-2 text-[36px]'/>
            <h2 className="font-bold text-[24px]">
              Vagas Exclusivas
            </h2> 
            <span className="text-center leading-relaxed text-[12px] max-w-[600px]">
              Em breve você poderá ter acesso a vagas exclusivas do Jobeiros.
              Assine o plano STARTER e tenha acesso antecipado
            </span>
            <div className="flex items-center justify-center gap-2">
                <Link href="/app/plans">
                    <Button>
                        Assinar Plano STARTER
                    </Button>
                </Link>
            </div>
          </div>
        </DashboardPageMain>
      </DashboardPage>
    )
  }
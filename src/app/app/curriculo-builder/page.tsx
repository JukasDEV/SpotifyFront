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
import { ReaderIcon } from '@radix-ui/react-icons'
import { useUser } from '@/context/user.context'
import Info from '@/components/app/info'
import { ModalVideo } from '@/components/app/modal-video'


export default function Page() {
  const {user} = useUser()
    
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
              <span className='flex items-center text-center gap-1 !text-[12px] !sm:text-[14px] leading-none'>
                Criador de Currículo
                <Info title="Criador de Currículo com IA" description='Crie seu currículo de forma certa, com as palavras chaves corretas, para as vagas que deseja, utilizando nossa IA.'/>
                <ModalVideo url={"https://www.youtube.com/embed/UY4SmBe8USs?si=YssTcb26SfygGI68"} title="Criador de Currículo" description="Crie seu currículo com a IA do Jobeiros, fique sempre a frente de seus concorrentes e garanta sua vaga em menos tempo."/>
              </span>
            </DashboardPageHeaderTitle>
          <DashboardPageHeaderNav>
            {user && user.plan == "FREE" || (user && user.credits_resume < 1)? 
              <Link href="/app/plans">
              <Button>
                  Upgrade
              </Button>
              </Link>
              :
              <Link href="/app/curriculo-builder/building">
              <Button>
                  Criar Meu Currículo
              </Button>
              </Link>
          }
            
          </DashboardPageHeaderNav>
        </DashboardPageHeader>
        <DashboardPageMain>
          <div className='w-full h-[80vh] justify-center items-center flex flex-col gap-4'>
            <ReaderIcon className='w-[65px] h-[65px] bg-gray-100 text-black rounded-full p-2 text-[36px]'/>
            <h2 className="font-bold text-[24px]">
              Criador de Currículos
            </h2> 
            <span className="text-center leading-relaxed text-[12px] max-w-[600px]">
              Crie seu curriculo com nosso criador de curriculos, com ele você pode criar seu curriculo de forma simples e rápida.
            </span>
            <div className="flex items-center justify-center gap-2">
                <Link href={user && user.plan == "FREE" || (user && user.credits_resume < 1) ? "/app/plans" : "/app/curriculo-builder/building"}>
                    <Button>
                        Criar Meu Currículo
                    </Button>
                </Link>
            </div>
          </div>
        </DashboardPageMain>
      </DashboardPage>
    )
  }
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
import { DrawingPinIcon, PersonIcon, ReaderIcon, RocketIcon } from '@radix-ui/react-icons'


  
export default function Page() {
    
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>Sobre nós</DashboardPageHeaderTitle>
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
            <PersonIcon className='w-[65px] h-[65px] bg-gray-100 text-black rounded-full p-2 text-[36px]'/>
            <h2 className="font-bold text-[24px]">
              Sobre nós
            </h2> 
            <span className="text-center leading-relaxed text-[12px] max-w-[600px]">
              Em breve você poderá saber tudo sobre o Jobeiros.
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
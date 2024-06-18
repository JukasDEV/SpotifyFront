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
import { DrawingPinIcon, HomeIcon, PersonIcon, ReaderIcon, RocketIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Cookies from 'cookies-js'
import { useUser } from '@/context/user.context'
import CardInterview from './_components/card-interview'
import CardInterviewLoading from './_components/card-interview-loading'
import Info from '@/components/app/info'
import { ModalVideo } from '@/components/app/modal-video'

export type Interview = {
  id: number,
  userid: number,
  question0: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  question5: string,
  datelog: string,
  jobstitle: string,
  jobsdetail: string,
  grade: number,
  feedbackresponse: string,

}

export default function Page() {
    const [myInterviews, setMyInterviews] = useState<Array<Interview>>()
    const {user} = useUser()

    const handleMyInterviews = async () => {
      const userid = Cookies.get('userid')
      try{
        const response = await axios.get(`/api/interviews/${userid}`)
        console.log(response)
        setMyInterviews(response.data)
        return response

      } catch (err) {
        throw err
      }
    }

    useEffect(() => {
      handleMyInterviews()
    }, [])

    useEffect(() => {
      console.log(myInterviews)
    }, [myInterviews])
        
    return (
      <DashboardPage>
        <DashboardPageHeader>
          <DashboardPageHeaderTitle>
              <span className='flex items-center gap-1 !text-[14px]'>
                Minhas Entrevistas
                <Info title="Seu histórico de entrevistas com nossa IA" description='Veja seu histórico de entrevistas para se preparar para as próximas de forma prática.'/>
                <ModalVideo url={"https://www.youtube.com/embed/6Pix8tMSN6g?si=FnWc4ZZhxPD487aD"} title="Seu histórico de entrevistas com nossa IA" description="Veja seu histórico de entrevistas para se preparar para as próximas de forma prática."/>
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
          {!myInterviews ? <div className='flex flex-col items-center gap-4'>
            <CardInterviewLoading/>
            <CardInterviewLoading/>
            <CardInterviewLoading/>
            </div> :
          (myInterviews && myInterviews.length < 0) || (user && user.plan == "FREE") ? 
          
          <div className='w-full h-[80vh] justify-center items-center flex flex-col gap-4'>
            <HomeIcon className='w-[65px] h-[65px] bg-gray-100 text-black rounded-full p-2 text-[36px]'/>
            <h2 className="font-bold text-[24px]">
              Minhas entrevistas
            </h2> 
            <span className="text-center leading-relaxed text-[12px] max-w-[600px]">
              Em breve você poderá ter acesso a todas as entrevistas que você já fez.
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
          
          : 
          
          <div className='flex flex-col gap-4'>
            {myInterviews.filter((interview) => interview.grade != null).map((interview) => {
              return (
                  <CardInterview interview={interview}/>
              )
            })}


          </div>
          
          }
          
        </DashboardPageMain>
      </DashboardPage>
    )
  }
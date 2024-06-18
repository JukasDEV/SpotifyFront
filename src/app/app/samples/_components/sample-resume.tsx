"use client"
import { useUser } from "@/context/user.context";
import { Curriculo } from "../page";
import { reduzirTicket } from "@/services/user/reduzirTicket";
import { User } from "@/model/user";
import { getUser } from "@/services/user/getUser";
import Cookies from "cookies-js";
import Link from "next/link";
import { useWorkflow } from "@/context/workflow.context";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import SampleSkeleton from "./sample-skeleton";

export default function SampleResume({resume} : {resume: Curriculo}){
    const {user, setUser} = useUser()
    const {setIsModalUpgradeActive} = useWorkflow()
    const [link, setLink] = useState<string>()

    const handleDownload = async () => {
      

        if (user.credits_resume < 1 || 
            (user.plan === 'FREE' && (resume.plan === 'STARTER' || resume.plan === 'PRO')) || 
            (user.plan === 'STARTER' && resume.plan === 'PRO')) {
            console.log('Você não tem créditos suficientes ou seu plano atual é inferior ao plano selecionado.');
            setIsModalUpgradeActive(true);
        } else {   
            // setIsModalUpgradeActive(true)
            toast({
                title: 'Baixando currículo',
                description: 'Seu curriculo está sendo baixado, aguarde um momento.',
                duration: 5000,
            })
            const getLink = await axios.get(`/api/getsamples/${resume.id}`)
            setLink(getLink.data.link)
            
            await reduzirTicket(user,
                {
                    qtd_interview: 0,
                    qtd_resume: 1,
                    qtd_analyze: 0,
                })

            const response = await getUser(user.id)
            setUser(response)
            window.open(link, '_blank');
            console.log("Link de download: ", getLink.data.link)
        }
    }

    

    return (
        // <Link href={`/app/samples/${resume.id}`}>
            <div className="relative flex flex-col items-center justify-center rounded px-2 cursor-pointer p-1 sm:max-w-52 max-w-40  max-h-73 gap-2 hover:opacity-80" style={{boxShadow: '1px 1px 1px 1px #00000036'}} onClick={handleDownload}>
                {resume.companyicon && resume.companyicon != "" &&
                    <img src={resume.companyicon} className="absolute top-0 right-0 w-[90px] max-h-[60px] object-contain"/>
                }
                <img src={resume.img} className="sm:w-48 sm:h-64 w-52 h-70 object-contain rounded"/>
                <div className="flex flex-col items-left justify-between w-full pb-4">
                    <span className="text-[13px] font-semibold text-left overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                        {resume.title}
                    </span>
                    <span className="text-[10px] bg-secondary p-1 rounded font-semibold max-w-[60px] text-center">
                        {resume.plan}
                    </span>
                </div>
            </div>
    )
}
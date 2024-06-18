"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import SampleSkeleton from './_components/sample-skeleton';
import SampleResume from './_components/sample-resume';
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from '@/components/app/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoadingBolinha } from '@/components/app/loading-bolinha';


export type Curriculo = {
    id: number,
    tag: string,
    link?: string,
    plan: string,
    title: string,
    img: string,
    companyicon?: string,
};

const tags = ["PROGRAMAÇÃO", "MARKETING", "BUSINESS", "ENGENHARIA", "ADMINISTRAÇÃO", "DESIGN"];

export const revalidate = 420 // 7 minutos

export default function Page() {
    const [activeTag, setActiveTag] = useState<string>('PROGRAMAÇÃO');
    const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const loadSamples = async () => {
        try {
            const resumes = await axios.get('/api/getsamples');
            setTimeout(() => {
                setCurriculos(resumes.data);
                setImagesLoaded(true);
            }, 500);
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Erro ao carregar currículos',
                description: 'Ocorreu um erro ao carregar os currículos, tente novamente mais tarde.',
                duration: 5000,
            });
            console.error('Erro ao carregar os currículos: ', err);
        }
    };

    useEffect(() => {
        loadSamples();
        // Garante que o efeito é limpo quando o componente é desmontado
        return () => {
            setImagesLoaded(false); // Reseta o estado de carregamento
        };
    }, []);

    const handleChangeTag = (tag: any) => {
        setImagesLoaded(false);
        setActiveTag(tag);
        setTimeout(() => {
            setImagesLoaded(true);
        }, 500);
    };

    return (
        <DashboardPage>
            <DashboardPageHeader className="">
                <DashboardPageHeaderTitle>
                    Biblioteca de Currículos
                </DashboardPageHeaderTitle>
                <DashboardPageHeaderNav>
                    <Link href="/app/plans">
                        <Button>
                            Upgrade
                        </Button>
                    </Link>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain className="sm:p-6 px-2">
                <div className="flex items-center flex-wrap wrap gap-2">
                    {tags.map((tag, index) => (
                        <Button key={index} variant={tag === activeTag ? 'default' : 'secondary'} onClick={() => handleChangeTag(tag)}>
                            {tag}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center sm:justify-start justify-center flex-wrap wrap gap-4 pt-8">
                    {!imagesLoaded ? 
                    <div className='w-full flex flex-col items-center justify-center h-[60vh]'>
                        <LoadingBolinha/>
                    </div> 
                    : curriculos.filter(curriculo => curriculo.tag.includes(activeTag)).map((curriculo, index) => {
                            return(
                                <SampleResume key={curriculo.id} resume={curriculo} />    
                            )
                        })
                    }                    
                </div>
            </DashboardPageMain>
        </DashboardPage>
    );
}

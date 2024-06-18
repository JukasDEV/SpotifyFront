"use client"
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/app/page";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import ProfileForm from "./_components/profile-form";
import EducationForm from "./_components/education-form";
import ExperienceForm from "./_components/experience-form";
import SkillForm from "./_components/skills-form";
import AchievementForm from "./_components/achievement-form";
import Resume from "./_components/resume";
import Preview from "../_components/preview";
import { useEffect } from "react";
import { reduzirTicket } from "@/services/user/reduzirTicket";
import { useUser } from "@/context/user.context";

export default function Page(){
    
    return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle>
                    Criador de Currículo
                </DashboardPageHeaderTitle>
                <DashboardPageHeaderNav>
                    <Button>
                        Salvar
                    </Button>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain className="flex flex-col w-full items-center">
                <Tabs defaultValue="profile-form" className="w-full flex flex-col items-center gap-8">
                    <TabsList className="grid sm:max-w-[600px] w-full sm:grid-cols-6 grid-cols-2 gap-2 sm:gap-0">
                        <TabsTrigger value="profile-form">Sobre você</TabsTrigger>
                        <TabsTrigger value="education-form">Educação</TabsTrigger>
                        <TabsTrigger value="experience-form">Experiência</TabsTrigger>
                        <TabsTrigger value="skill-form">Habilidades</TabsTrigger>
                        <TabsTrigger value="achievement-form">Conquistas</TabsTrigger>
                        <TabsTrigger value="preview">Currículo</TabsTrigger>
                    </TabsList>
                    <div className="w-full mt-10 sm:mt-0 flex items-center justify-center">
                        <div>
                            <TabsContent value="profile-form" className="sm:grid sm:grid-cols-2 gap-2 flex flex-col max-w-[1200px]">
                                <ProfileForm/>
                                <Preview/>
                            </TabsContent>
                            <TabsContent value="education-form" className="sm:grid sm:grid-cols-2 gap-2 flex flex-col max-w-[1200px]">
                                <EducationForm/>
                                <Preview/>
                            </TabsContent>
                            <TabsContent value="experience-form" className="sm:grid sm:grid-cols-2 gap-2 flex flex-col max-w-[1200px]">
                                <ExperienceForm/>
                                <Preview/>
                            </TabsContent>
                            <TabsContent value="skill-form" className="sm:grid sm:grid-cols-2 gap-2 flex flex-col max-w-[1200px]">
                                <SkillForm/>
                                <Preview/>
                            </TabsContent>
                            <TabsContent value="achievement-form" className="sm:grid sm:grid-cols-2 gap-2 flex flex-col max-w-[1200px]">
                                <AchievementForm/>
                                <Preview/>
                            </TabsContent>
                            <TabsContent value="preview">
                                <Resume/>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </DashboardPageMain>
        </DashboardPage>
    )
}
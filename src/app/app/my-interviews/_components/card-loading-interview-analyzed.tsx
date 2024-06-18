"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from "@/components/app/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Interview } from "../page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterDataString } from "@/lib/formatterData";
import { Caption } from "../../interview/review/_components/caption";
import CirclePercentage from "../../interview/review/_components/circle-percentage";
import QuestionAnalyzedCard, { AlertCircleIcon, CheckCircleIcon, LightbulbIcon } from "../../interview/review/_components/question-analyzed-card";

export default function CardLoadingInterviewAnalyzed() {
   
   return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle className="animate-pulse bg-gray-200 h-[20px] w-[100px]">
                    <></>
                </DashboardPageHeaderTitle>
                <DashboardPageHeaderNav>
                    <Link href="/app/my-interviews">
                        <Button>Voltar</Button>
                    </Link>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain className="flex flex-col gap-4">
                <Card className="animate-pulse">
                    <CardHeader>
                        <CardTitle className="animate-pulse bg-gray-200 h-[20px]">
                        </CardTitle>
                        <CardDescription className="animate-pulse bg-gray-200 h-[20px]">
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="animate-pulse bg-gray-200 h-[20px]"></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-6">
                        <div className="flex items-center space-x-2">
                            <AlertCircleIcon className="text-red-500" />
                            <p className="animate-pulse bg-gray-200 h-[20px] w-full">
                            </p>
                        </div>
                        <p className="leading-normal"></p>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                            <LightbulbIcon className="text-yellow-500" />
                            <p className="animate-pulse bg-gray-200 h-[20px] w-full"></p>
                            </div>
                            <div className="px-6 py-4 bg-gray-100 rounded-lg animate-pulse">
                            <p className="leading-normal text-black ">
                            </p>
                            </div>
                            <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="text-green-500" />
                            <p className="animate-pulse bg-gray-200 h-[20px] w-full"></p>
                            </div>
                            <p className="leading-normal">
                            </p>
                        </div>
                        </div>
                    </CardContent>
                </Card>
            </DashboardPageMain>
        </DashboardPage>
    ); 
}


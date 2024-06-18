import { DashboardPage, DashboardPageMain } from "@/components/app/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Page(){
    return (
        <DashboardPage>
            <DashboardPageMain>
                <div className="w-full py-6">
                    <div className="container flex flex-col gap-4 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Escolha um plano</h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                            Desbloqueie mais funcionalidades e suporte. Melhore sua conta para acessar funcionalidades premium e serviços.
                            </p>
                        </div>
                        </div>
                        <div className="grid max-w-sm gap-4 mx-auto sm:max-w-none sm:grid-cols-2">
                        <Card>
                            <CardHeader className="p-4 flex flex-col items-start">
                                <div className="text-2xl font-bold">Starter</div>
                                <div className="text-2xl font-bold">R$ 29,00</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Mensal</div>
                            </CardHeader>
                            <CardContent className="p-4 grid gap-4">
                                <ul className="grid gap-2">
                                    <li>4 Análises de Currículo</li>
                                    <li>4 Entrevistas com IA</li>
                                    <li>10 Curriculos com IA Generator</li>
                                    <li>Suporte 24/7</li>
                                </ul>
                                <a href="https://pay.kirvano.com/1a62343a-ffdb-4983-bbf1-51d8b295963f" target="blank" className="w-full">
                                    <Button size="lg" className="w-full">Upgrade Agora</Button>
                                </a>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="p-4 flex flex-col items-start">
                            <div className="text-2xl font-bold">Pro</div>
                            <div className="text-2xl font-bold">R$ 49,00</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Mensal</div>
                            </CardHeader>
                            <CardContent className="p-4 grid gap-4">
                            <ul className="grid gap-2">
                                <li>8 análises de Currículo</li>
                                <li>8 Entrevistas com IA</li>
                                <li>Curriculos Ilimitados com IA Generator</li>
                                <li>Suporte 24/7</li>
                            </ul>
                            <a href="https://pay.kirvano.com/17d7d56c-4e78-495e-9a20-94755d6bd186" target="blank" className="w-full">
                                <Button size="lg" className="w-full">Upgrade Agora</Button>
                            </a>
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                    </div>
            </DashboardPageMain>
        </DashboardPage>
    )
}
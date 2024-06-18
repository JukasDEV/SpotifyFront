"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import axios from 'axios'
import Cookies from "cookies-js"
import Link from "next/link"
import { ModalForgotPassword } from "./modal-forgot-password"
import { useState } from "react"
import { Icon } from "@iconify/react"

export default function AuthForm() {
    const form = useForm()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const handleSubmit = form.handleSubmit(async (data) => {
        setIsLoading(true)

        try {
            await axios.post('/api/auth/login', {
                email: data.email,
                password: data.password,
            }).then((response) => {
                Cookies.set('token', response.data.token, {expires: 84600 / 2})
                Cookies.set('user', JSON.stringify(response.data.user), {expires: 84600 / 2})
                Cookies.set('plan', response.data.user.planId, {expires: 84600 / 2})
                toast({
                    title: 'Sucesso!',
                    description: 'Aproveite o SpotDeezer!',
                    duration: 5000,
                })
                setIsLoading(false)
                window.location.href = '/app'
            }).catch((err) => {
                setIsLoading(false)
                toast({
                    variant: "destructive",
                    title: err.response.data.message.replace("Erro: ", ""),
                    description: "Erro ao efetuar o login.",
                    duration: 5000,
                })
            })
        } catch (error) {
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: 'Ocorreu um erro',
                description: 'Tente novamente',
                duration: 5000,
            })
        }
    })

    return (
        <div className="w-full lg:grid lg:grid-cols-2 lg:min-h-[600px] xl:min-h-[800px] h-screen flex items-center justify-center">
            <div className="flex items-center justify-center py-12 lg:py-0">
                <div className="mx-auto w-[350px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Entrar</h1>
                        <p className="text-gray-500 dark:text-gray-400">Preencha Seu Login para Usar o SpotDeezer.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')}  />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" placeholder="********" required type="password" {...form.register('password')} />
                        </div>
                        
                        <div className="flex flex-col items-center w-full gap-2">
                            <Button disabled={isLoading} className="w-full font-bold flex items-center gap-2" type="submit">
                                {isLoading ? 
                                <>
                                    <Icon icon="eos-icons:loading" />
                                    Entrando...
                                </>: 'Entrar'}
                            </Button>
                            <Link href="/auth/register" className="font-bold text-gray-800 underline cursor-pointer w-full">
                                    <Button variant="outline" className="w-full">
                                        Quero registrar agora
                                    </Button>
                            </Link>
                            <ModalForgotPassword/>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            <img
                alt="Image"
                className="hidden lg:flex h-full w-full object-cover bg-primary"
                src="/BannerLogin.png"
                style={{
                    aspectRatio: "1920/1080",
                    objectFit: "contain",
                }}
            />
        </div>
    )
}

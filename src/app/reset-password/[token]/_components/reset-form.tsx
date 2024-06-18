"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { toast } from "@/components/ui/use-toast"
import axios from 'axios'
import Cookies from "cookies-js"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import { sleep } from "@/lib/sleep"



export default function ResetForm({token} : {token: string}) {
    const form = useForm()
    const [isSending, setIsSending] = useState<boolean>(false)
    
    const handleSubmit = form.handleSubmit(async (data) => {
        setIsSending(true)
       try {
        if(data.password != data.confirm_password){
            toast({
                variant: "destructive",
                title: 'Senhas não coincidem',
                description: 'Tente novamente',
                duration: 5000,
            })
            setIsSending(false)
            return
        } else {
            const response = await axios.post('/api/auth/resetpassword', {
                token: token, 
                newPassword: data.password, 
                confirmPassword: data.confirm_password
            })
            toast({
                variant: "default",
                title: 'Senha alterada com sucesso',
                description: 'Faça login com sua nova senha',
                duration: 5000,
            })
            await sleep(3000)
            window.location.href = '/auth'
            setIsSending(false)
            return response
        }
       } catch (err) {
            setIsSending(false)
            toast({
                variant: "destructive",
                title: 'Erro ao alterar senha',
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
                        <h1 className="text-3xl font-bold">Alterar Senha</h1>
                        <p className="text-gray-500 dark:text-gray-400">Preencha os campos abaixo com sua nova senha.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" placeholder="********" required type="password" {...form.register('password')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirmar Senha</Label>
                            <Input id="confirm_password" placeholder="********" required type="password" {...form.register('confirm_password')} />
                        </div>
                        <Button className="w-full font-bold" type="submit">
                            Alterar Senha
                        </Button>                        
                    </form>
                </div>
            </div>
            
            <img
                alt="Image"
                className="hidden lg:flex h-full w-full object-cover bg-primary"
                src="/BannerLogin.png"
                style={{
                    aspectRatio: "1280/960",
                    objectFit: "contain",

                }}
            />
            
        </div>
    )
}

"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import axios from 'axios'
import Cookies from "cookies-js"
import Link from "next/link"

export default function RegisterForm() {
    const form = useForm()
    
    const handleSubmit = form.handleSubmit(async (data) => {
        console.log(data)
        if(data.password === data.confirm_password){
            try {
                await axios.post('/api/auth/register', {
                    email: data.email,
                    password: data.password,
                    name: data.name
                }).then(async (response) => {
                    console.log("Response: ", response)
                    Cookies.set('token', response.data.token, {expires: 84600 / 2})
                    Cookies.set('user', JSON.stringify(data), {expires: 84600 / 2})
                    Cookies.set('plan', response.data.plan, {expires: 84600 / 2})
                    Cookies.set('userid', response.data.userid, {expires: 84600 / 2})
                    toast({
                        title: 'Registrado com Sucesso!',
                        description: 'Aproveite o Jobeiros!',
                        duration: 5000,
                    })
                    const sendWelcomeEmail = await axios.post('/api/welcome-email', {
                        userEmail: data.email
                    })
                    window.location.href = '/app/plans'
                }).catch((err) => {
                    toast({
                        variant: "destructive",
                        title: err.response.data.message.replace("Error: ", ""),
                        description: 'Erro ao registrar!',
                        duration: 5000,
                    })
                })
                
            } catch (error) {
                console.error(error)
                toast({
                    variant: "destructive",
                    title: 'Ocorreu um erro',
                    description: 'Tente novamente',
                    duration: 5000,
                })
            }
        } else {
            toast({
                variant: "destructive",
                title: 'As senhas devem ser iguais.',
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
                        <h1 className="text-3xl font-bold">Registrar</h1>
                        <p className="text-gray-500 dark:text-gray-400">Registre-se no Jobeiros e alavanque sua carreira.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" placeholder="Maria Silva" maxLength={49} required {...form.register('name')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" placeholder="********" required type="password" {...form.register('password')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirmar Senha</Label>
                            <Input id="confirm_password" placeholder="********" required type="password" {...form.register('confirm_password')} />
                        </div>
                        <Button className="w-full font-bold" type="submit">
                            Registrar
                        </Button>
                        <div>
                            <Link href="/auth" className="font-bold text-gray-800 underline cursor-pointer">
                                Já tenho conta
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            
            <img
                alt="Image"
                className="hidden lg:flex h-full w-full object-cover bg-primary"
                src="/spot.png"
                style={{
                    aspectRatio: "1280/960",
                    objectFit: "contain",
                }}
            />
        </div>
    )
}

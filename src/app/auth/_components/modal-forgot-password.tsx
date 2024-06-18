import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Icon } from '@iconify/react'
import axios from 'axios'
import { toast } from "@/components/ui/use-toast"


export function ModalForgotPassword() {
    const [isSending, setIsSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)

    const [email, setEmail] = useState<string>()

    

    const handleSend = async () => {
        setIsSending(true)
        try {
         const response = await axios.post('/api/auth/forgotpassword', {userEmail: email})


         toast({
          variant: "default",
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada e spam para recuperar sua senha.",
          duration: 5000
         })
         setIsSending(false)
         setIsSent(true)
         return response
          
        } catch (err: any) {
          setIsSending(false)
          setIsSent(false)
          toast({
            variant: "destructive",
            title: "Erro ao enviar o email.",
            description: err.error,
          })
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="mt-4 text-left w-full underline text-black text-[14px] cursor-pointer">Esqueci minha senha</a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Insira seu email</DialogTitle>
          <DialogDescription>
            Insira o email de sua conta para enviarmos um link de recuperação de senha.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input id="name" placeholder="m@exemplo" value={email} onChange={(e) => {setEmail(e.target.value)}} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
            <Button disabled={isSending || isSent} onClick={handleSend}>
                {isSending ?  
                <div className="flex items-center gap-2">
                    <Icon icon="eos-icons:loading" />
                    Enviando...
                </div> : 
                isSent ? 'Enviado!' : 
                'Recuperar senha'
                }
                
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

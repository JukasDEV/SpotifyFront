"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

  
  
  export function Caption() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>  
        <Button variant="default" className='border-none bg-transparent absolute hover:bg-transparent shadow-none'>
            <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 font-bold flex items-center justify-center text-[10px] text-white p-2`}>i</span>
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-blue-500 flex items-center justify-center text-[10px] text-white p-2`}>i</span>
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Explicação da Pontuação da Entrevista de IA</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
                <div className="flex flex-col justify-start items-start">
                    <span className="font-[600] text-[14px]">
                        Palavras-chave (20%)
                    </span>
                    <span className="text-[11px]">
                        Avalia o uso apropriado e relevante de palavras relacionadas ao tópico.
                    </span>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <span className="font-[600] text-[14px]">
                        Sentimento (15%)
                    </span>
                    <span className="text-[11px]">
                        Avalia positividade, confiança e alinhamento de tom.
                    </span>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <span className="font-[600] text-[14px]">
                        Tamanho (15%)
                    </span>
                    <span className="text-[11px]">
                        Garante que a resposta não seja muito curta nem muito longa.
                    </span>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <span className="font-[600] text-[14px]">
                        Termos de Texto (15%)
                    </span>
                    <span className="text-[11px]">
                        Verifica a utilização precisa de terminologia específica do tópico.
                    </span>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <span className="font-[600] text-[14px]">
                    Linguagem (35%)
                    </span>
                    <span className="text-[11px]">
                    Examina correção, coerência, complexidade e redundância.
                    </span>
                </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
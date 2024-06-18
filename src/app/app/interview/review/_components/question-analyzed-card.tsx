"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

type QuestionAnalyzedType = {
  obj: {
    question: string
    answer: string
    RespostaRecomendada: string
    feedback: {
      NotaDaResposta: string;
      MelhoriaSugerida: string;
      RespostaRecomendada: string;
    }
    needsImprovement?: string
  }
  
}


export default function QuestionAnalyzedCard({ obj }: QuestionAnalyzedType) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feedback da Entrevista - Nota: {obj.feedback.NotaDaResposta.replace('/100', '')} / 100</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <AlertCircleIcon className="text-red-500" />
            <p className="text-lg font-semibold">
              {obj.question}
            </p>
          </div>
          <p className="leading-normal">{obj.answer}</p>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <LightbulbIcon className="text-yellow-500" />
              <p className="text-lg font-semibold">Possíveis Melhorias</p>
            </div>
            <div className="px-6 py-4 bg-gray-100 rounded-lg">
              <p className="leading-normal text-black">
                {obj.feedback.MelhoriaSugerida}  
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="text-green-500" />
              <p className="text-lg font-semibold">Resposta Recomendada</p>
            </div>
            <p className="leading-normal">
              {obj.feedback.RespostaRecomendada}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AlertCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}


export function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}


export function LightbulbIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

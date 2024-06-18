import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { openai } from '@/services/openai';
import { Uploadable } from 'openai/uploads.mjs';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/user.context';
import { uploadCustomerResumeToFirebase, uploadResumeToFirebase } from '@/services/firebase/uploadImageToFirebase';
import Cookies from 'cookies-js';
import { sleep } from '@/lib/sleep';
import { DocxToText } from '@/lib/docxToText';
import { PdfToText } from '@/lib/pdfToText';

export default function CardAnalyzer() {
  const [file, setFile] = useState<File | null | {
    lastModified: number;
    name: string;
    path: string;
    size: number;
    type: string;
    webkitRelativePath: string;
    lastModifiedDate: Object;
  }>(null);
  const [fileBuffer, setFileBuffer] = useState<Uint8Array | null>(null);
  const [blobState, setBlobState] = useState<string | any>()
  const [blobStateUrl, setBlobStateUrl] = useState<string | any>()
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useUser()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (loadEvent: any) => {
        const arrayBuffer = loadEvent.target.result
        const buffer = new Uint8Array(arrayBuffer as ArrayBuffer)
        setFileBuffer(buffer)

        const blob = new Blob([arrayBuffer], { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        setBlobState(blob)
        setBlobStateUrl(blobUrl)
      }
      reader.readAsArrayBuffer(file)
      setFile(file);
    },
  });

  const handleStartAnalysis = async () => {
    setIsLoading(true);
    
    if (!(file instanceof File)) {
        toast({
            variant: "destructive",
            title: 'Erro',
            description: 'Arquivo inválido.',
            duration: 5000,
        });
        setIsLoading(false);
        return;
    }

    try {
        let text = '';
        
        if (file.type === "application/pdf") {
            text = PdfToText(file);
            toast({
                variant: "destructive",
                title: 'Analise de PDF em manutenção',
                description: 'Formato de arquivo (PDF) em manutenção.',
                duration: 5000,
            })
            return
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            text = await DocxToText(file); 
        } else {
            throw new Error("Formato de arquivo não suportado.");
        }

        console.log(text)
        const CustomerName = JSON.parse(Cookies.get('user')).name
        const userid = parseInt(Cookies.get('userid'),10)
        const link = await uploadCustomerResumeToFirebase(file, CustomerName)
        
        const response = await axios.post('/api/resume/analise', {
            userId: userid,
            name: CustomerName,
            TextoCurriculo: text,
            link: link
        });
        console.log(response)
        toast({
            title: 'Análise concluída com sucesso',
            description: 'Sua análise foi concluída com sucesso.',
            duration: 5000,
        })
        sessionStorage.setItem('resume_analise', JSON.stringify(response.data));

        await sleep(2000)
        window.location.href = '/app/curriculo-builder/feedback'

    } catch (err) {
        toast({
            variant: "destructive",
            title: 'Erro ao iniciar a análise',
            description: 'Tente novamente mais tarde.',
            duration: 5000,
        });
        console.error("Erro ao iniciar a análise:", err);
    } finally {
        setIsLoading(false);
    }
  };



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Iníciar Análise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecione seu currículo</DialogTitle>
          <DialogDescription>
            Selecione ou arraste seu currículo (PDF ou Docx).
          </DialogDescription>
        </DialogHeader>
        <div {...getRootProps()} className="relative flex flex-col items-center justify-center h-full min-h-[300px]  border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
          <input {...getInputProps()} />
          {file ? (
            <div className='w-full h-full flex flex-col items-center justify-center bg-yellow-300 gap-2'>
              <Icon icon="material-symbols:check" className="animate-pulse w-[48px] h-[48px] font-bold" />
              <span className='text-yellow-700'>{file.name && file.name}</span>
            </div>
          ) : isDragActive ? (
            
            <div className='w-full h-full flex items-center justify-center bg-yellow-300'>
              <p className='text-yellow-700'>Solte o arquivo aqui...</p>
            </div>
          ) : (
            <>
              <ArrowUpIcon className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Arraste e solte aqui</p>
              <label className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                ou selecione um arquivo
              </label>
            </>
          )}
        </div>
        
        <DialogFooter className='flex items-center !justify-between !w-full flex-col sm:flex-row gap-2'>
            <Button className='w-full' variant="outline" disabled={!file} onClick={()=>{setFile(null)}}>
                Remover Arquivo
            </Button>
          <Button className='w-full' disabled={!file || isLoading} onClick={handleStartAnalysis}>
            {isLoading ? 
            <span className='flex items-center gap-2'>
              <Icon icon="eos-icons:loading" />
              <span>Analisando...</span>
            </span> 
            : "Iniciar Análise"}
            
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArrowUpIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l7-7 7 7"/>
      <path d="M12 19V5"/>
    </svg>
  )
}

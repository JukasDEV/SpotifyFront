import { useResume } from "@/context/resume.context"
import mammoth from "mammoth";
import { useEffect, useState } from "react";
import { DocumentCreator } from "../building/_components/resume-generator";
import { Card } from "@/components/ui/card";

export default function Preview(){
    const {myResume} = useResume()
    const [htmlContent, setHtmlContent] = useState('');
    const [aux, setAux] = useState<any>()


    const styleMap = `
        p[style-name='Title'] => h1.cv-title:fresh
        p[style-name='Subtitle'] => h3.cv-subtitle:fresh
        p[style-name='Heading 1'] => h3.cv-heading:fresh
        p[style-name='Heading 6'] => h6.cv-contact:fresh
        p[style-name='Normal'] => p.cv-normal:fresh
        p[style-name='Heading 2'] => h4.cv-subheading:fresh
        p[style-name='Body Text'] => p.cv-body-text:fresh
    `;

    const css = `<style>
    /* Título principal (nome do candidato) */
    .cv-title {
        font-size: 28px;
        margin-bottom: 10px;
        text-align: left;
        font-family: Times New Roman !important;
    }

    p {
        text-align: left;
    }

    /* Aplica apenas ao primeiro parágrafo */
    .cv-contact {
        text-align: center;
        font-size: 10px;
    }

    /* Informações de contato */
    .cv-subtitle {
        text-align: center;
        margin-bottom: 20px;
        width: 90%;
        font-size: 10px;
    }

    /* Seção de Educação e Experiência */
    .cv-heading {
        font-size: 16px;
        font-weight: 500;
        color: #4A90E2 !important; /* Azul para destaque */
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: Times New Roman !important;
        width: 100%;
        border-bottom: 1px solid black;
    }

    /*Habilidades e conquistas*/
    .cv-subheading{
        color: #4A90E2;
        font-size: 13px;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    /* Instituição e período */
    .cv-institution {
        font-size: 18px;
        font-weight: bold;
    }

    /* Descrição de cargo ou detalhes de educação */
    .cv-role {
        font-style: italic;
        margin-bottom: 5px;
    }

    /* Lista de habilidades e conquistas */
    .cv-skills, .cv-achievements {
        list-style-type: circle;
        margin-left: 20px;
    }

    .cv-skill-item, .cv-achievement-item {
        margin-bottom: 5px;
    }

    /* Detalhes adicionais como sumário das experiências */
    .cv-detail {
        margin-top: 5px;
        margin-left: 20px;
    } </style>
`

    async function convertDocxToHtml(blob: Blob) {
        const arrayBuffer = await blob.arrayBuffer();
        // Agora você pode passar arrayBuffer para mammoth.js ou outra biblioteca
        const result = await mammoth.convertToHtml({ arrayBuffer } as any, { styleMap });
        setHtmlContent(result.value + css);
        console.log(result)
        return result.value;
    }


    function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result instanceof ArrayBuffer) {
                    resolve(reader.result);
                } else {
                    reject(new Error("Resultado não é um ArrayBuffer"));
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    }

    const convert = async () => {
        const documentCreator = new DocumentCreator();
        const contents = [
            myResume.profile,
            myResume.experiences,
            myResume.educations,
            myResume.skills,
            myResume.achievements
          ];
          
          const blob = await documentCreator.createAsBlob(contents)
          blobToArrayBuffer(blob)
          convertDocxToHtml(blob)
    }


      useEffect(() => {
        convert()
      }, [myResume])
      
    return (
        <Card className="flex flex-col p-4 pt-8 pb-20 w-full rounded">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
        </Card>
    )
}
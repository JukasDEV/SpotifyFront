"use client"
import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { DocumentCreator } from "./resume-generator";
import { Button } from "@/components/ui/button"; // Certifique-se de que este é o caminho correto para o seu componente Button
import { useResume } from "@/context/resume.context";
import Preview from "../../_components/preview";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user.context";
import { reduzirTicket } from "@/services/user/reduzirTicket";


export default function Resume() {
    const { myResume } = useResume()
    const { user } = useUser()

    const generate = async () => {
        await reduzirTicket(user, {
            qtd_interview: 0,
            qtd_analyze: 0,
            qtd_resume: 1,
        })
        
        const documentCreator = new DocumentCreator();
        const doc = documentCreator.create([
          myResume.profile,
          myResume.experiences,
          myResume.educations,
          myResume.skills,
          myResume.achievements
        ]);


        const blob = await Packer.toBlob(doc);

        saveAs(blob, "jobeiros.docx");
        
    };

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center justify-between w-full">
                <Label>Preview: </Label>
                <Button onClick={generate}>Baixar Currículo</Button>
            </div>
            <Preview/>
        </div>
    );
}

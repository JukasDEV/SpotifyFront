import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Interview } from "../page";
import { formatterDataString } from "@/lib/formatterData";
import CirclePercentage from "../../interview/review/_components/circle-percentage";
import Link from "next/link";
import Cookies from "cookies-js";

export default function CardInterview({ interview }: {interview: Interview}){

    return (
        <Link href={`/app/my-interviews/${interview.id}`}> 
            <Card className="flex items-center justify-start p-2 cursor-pointer">
                <CardHeader>
                    <CardTitle>
                        <CirclePercentage percentage={interview.grade}/>
                        
                    </CardTitle>
                </CardHeader>
                <div className="flex flex-col items-left justify-left gap-2">
                    <span>
                        Entrevista para a vaga: <strong>{interview.jobstitle}</strong>
                    </span>
                    <span>
                        Data: {formatterDataString(interview.datelog)}
                    </span>
                </div>
            </Card>
        </Link>
    )
}
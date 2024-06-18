import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function CardInterviewLoading(){

    return (
        <Card className="flex items-center justify-start p-2 cursor-pointer w-full animate-pulse">
            <CardHeader>
                <CardTitle className="w-12 animate-pulse bg-gray-200 h-12 rounded-full">
                </CardTitle>
            </CardHeader>
            <div className="flex flex-col items-left justify-left gap-2 w-full">
                <span className="w-full h-[20px] animate-pulse bg-gray-200">
                    
                </span>
                <span className="w-full h-[20px] animate-pulse bg-gray-200">
                </span>
            </div>
        </Card>
    )
}
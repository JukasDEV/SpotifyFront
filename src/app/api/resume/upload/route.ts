import { openai } from "@/services/openai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest){
    try {
        const { blobUrl } = await req.json()

        const response = await openai.files.create({
            file: blobUrl,
            // fileName: fileName,
            purpose: "assistants"
        })
            console.log("Response: ", response)

        return NextResponse.json(response);
        
    } catch (err) {
        console.log(err)
        throw NextResponse.json(err);
    }
}
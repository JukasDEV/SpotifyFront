import { openai } from "@/services/openai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // Assumindo que você tem axios instalado
import FormData from "form-data";
import fs from "fs";
import { tmpdir } from "os";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { sleep } from "@/lib/sleep";

//@ts-ignore
export async function POST(req) {
    try {
        if (!req.body) {
            return NextResponse.json({ error: "No body found" });
        }
        const { blobFile } = await req.json();

        const response = await openai.files.create({
            file: fs.createReadStream(blobFile),
            purpose: "assistants"
        });

        console.log(response)
        // await sleep(5000)

        // await unlink(tempFilePath);
        
        return NextResponse.json(response);
    } catch (err) {
        return NextResponse.json(err)
    }
}

import { openai } from '@/services/openai'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse){
    try {
        const response = await openai.files.list({
            query: {
                orderby: 'desc'
            }
        })
        console.log(response)
        return NextResponse.json(response)
    } catch (err) {
        throw NextResponse.json(err)
    }
}
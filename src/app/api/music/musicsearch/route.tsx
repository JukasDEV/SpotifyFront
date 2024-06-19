export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "https://joaospotfy-search.search.windows.net", 
  "azuresql-index-2",                                
  new AzureKeyCredential("ZHJ0sRV1DQzmUnF2apdj0xEDK3yQ48gxsMrgCxKzHdAzSeCP1TtP") 
);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        if (!data.search) {
            return NextResponse.json({ error: "searchText is required" }, { status: 400 });
        }

        const searchResults = await searchClient.search(data.search);
        const resultsArray = [];

        for await (const result of searchResults.results) {
            resultsArray.push(result);
        }

        return NextResponse.json({
            searchResults: resultsArray,
            searched: data.search
        });
    } catch (err: any) {
        console.error("Error during search:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
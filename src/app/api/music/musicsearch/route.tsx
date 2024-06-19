export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "https://joaospotfy-search.search.windows.net", 
  "azuresql-index-2",                                
  new AzureKeyCredential('process.env.NEXT_PUBLIC_AZURE_SEARCH_API_KEY')
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
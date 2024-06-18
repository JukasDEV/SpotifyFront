import mammoth from "mammoth"

export async function DocxToText(file: File){
    try {
        const arrayBuffer = await file.arrayBuffer();
        
        const result = await mammoth.extractRawText({arrayBuffer: arrayBuffer});
        
        return result.value;
    } catch (err) {
        throw err
    }
}
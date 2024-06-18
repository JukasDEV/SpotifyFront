import { NextRequest, NextResponse } from "next/server"
import { getUrl } from "@/lib/get-url"



const PUBLIC_FILE = /\.(.*)$/

export default async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/api/')) {
      // Aplicar cabeçalhos CORS manualmente
      const res = NextResponse.next();
      res.headers.set('Access-Control-Allow-Origin', 'https://jobeiros.com, https://kirvano.com, https://app.kirvano.com, http://jobeiros.com');
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Se a requisição for um preflight (OPTIONS), retorne a resposta imediatamente
      if (req.method === 'OPTIONS') {
          return res;
      }
    }

    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
      ) {
        return
      }


      const token = req.cookies.get("token")
      const user = req.cookies.get("user")
      const userId = req.cookies.get("userid")
      const pathname = req.nextUrl.pathname

      if (pathname === "/auth" && token && user && userId) {
          return NextResponse.redirect(new URL(getUrl('/app')))
      } 
      
      if (pathname.includes("/app") && (!token || !user || !userId)) {
          return NextResponse.redirect(new URL (getUrl('/auth')))
      }
     

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/'
    ]
}


 


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobeiros",
  description: "Alavanque sua carreira e garanta seu emprego com Jobeiros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          {/* <!-- Meta Pixel Code --> */}
          <script>{`
         
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2090804494632399');
            fbq('track', 'PageView');
          
          `}
          </script>
          <noscript><img height="1" width="1" style={{display:"none"}}
          src="https://www.facebook.com/tr?id=2090804494632399&ev=PageView&noscript=1"
          /></noscript>
          {/* <!-- End Meta Pixel Code --> */}
         
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {children}
        <Toaster/>
        <style>
          {`
            html {
              scroll-behavior: smooth !important;
            }
          `}
        </style>
        
      </body>
      <footer>
        <Script strategy="afterInteractive">
        {`
          function work() {
              function getParams() {
                  const url = new URL(window.location.href);
                  const src = url.searchParams.get("src");
                  const sck = url.searchParams.get("sck");
                  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
                      .map(param => \`\${param}=\${encodeURIComponent(url.searchParams.get(param) || '')}\`)
                      .join('&');
                  let allParams = '';
                  if (src) allParams += \`src=\${encodeURIComponent(src)}&\`;
                  if (sck) allParams += \`sck=\${encodeURIComponent(sck)}&\`;
                  allParams += utmParams;
                  return allParams;
              }
              (function updateLinks() {
                  document.querySelectorAll("a").forEach((link) => {
                      const params = getParams();
                      if (params) {
                          link.href += link.href.includes("?") ? \`&\${params}\` : \`?\${params}\`;
                      }
                  });
              })();
          }
          if (document.readyState === "complete") {
              work();
          } else {
              window.addEventListener("load", work);
          }
        `}
        </Script>
      </footer>
    </html>
  );
}

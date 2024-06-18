import { MainSidebar } from "./_components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/context/user.context"
import { useWorkflow, WorkflowProvider } from '@/context/workflow.context'
import ModalUpgrade from "./_components/modal-upgrade"
import Script from "next/script"

//...
//...meta pixel code adicionado....
export const metadata = {
  title: 'TheoFy',
  description: 'Escute musicas no TheoFy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  
  return (
    <>
    <head>
    <script defer data-domain="jobeiros.com" src="https://plausible.io/js/script.js"></script>
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
         
         
          <!-- End Meta Pixel Code -->
            
          `}
          </script>
          <noscript><img height="1" width="1" style={{display:"none"}}
          src="https://www.facebook.com/tr?id=2090804494632399&ev=PageView&noscript=1"
          /></noscript>
          
    </head>
    <body className="grid grid-cols-1 h-screen overflow-x-hidden">
      <ThemeProvider
        attribute="class"
        enableSystem={true}
        defaultTheme="dark"
      >
        <WorkflowProvider>
          <UserProvider>
                  <>
                    <MainSidebar/>
                    <main className="sm:ml-[255px] relative">
                          {children}
                          
                    </main>
                  </>
          </UserProvider>
        </WorkflowProvider>
      </ThemeProvider>
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
    </body>
    
    </>
  )
}

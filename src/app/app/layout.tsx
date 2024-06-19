import Sidebar2 from "./_components/sidebar2";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/user.context";
import { WorkflowProvider } from '@/context/workflow.context';
import Script from "next/script";

export const metadata = {
  title: 'SpotDeezer',
  description: 'Conheça agora o SpotDeezer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      <body className=" h-screen overflow-x-hidden w-screen">
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="dark">
          <WorkflowProvider>
            <UserProvider>
              <div className="flex items-start justify-content w-full">
                {/* <Sidebar2 /> */}
                <main className="relative w-full">
                  {children}
                </main>
              </div>
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
  );
}

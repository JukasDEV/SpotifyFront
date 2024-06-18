"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import HowItWorks from "./_components/how-it-works"
import Faq from "./_components/faq"
import TestimonyCard from "./_components/testimony-card"
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Script from "next/script"


const companies = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Product_Hunt_Logo.svg/2560px-Product_Hunt_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png",
  "https://c5gwmsmjx1.execute-api.us-east-1.amazonaws.com/prod/dados_processo_seletivo/logo_empresa/138270/Logo_Kirvano.png_name_20230811-28731-1bw3q5f.png",
  // "https://cdn.portal.estacio.br/1_Desktop_ibmec_logo_430884bed1.svg"
  "https://firebasestorage.googleapis.com/v0/b/curriculo-saas.appspot.com/o/logoBarbieri.png?alt=media&token=abda51b5-74f4-4bf4-9b0f-0ef89c352335",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/2560px-Vercel_logo_black.svg.png"
  
]


export default function Home() {
  return (
    <>
    <head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/logo.png" />
    <script defer data-domain="jobeiros.com" src="https://plausible.io/js/script.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta property="og:image" content="/JobeirosAmarelo.png"/>
  
    <meta property="og:image:type" content="image/png" />
  
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>


    <meta property="og:type" content="website"/>
    <meta property="og:title" content="Jobeiros - Alavanque sua carreira e garanta seu emprego com Jobeiros"/>
    <meta property="og:description" content="Alavanque sua carreira e garanta seu emprego com Jobeiros"/>

    <meta
      name="description"
      content="Alavanque sua carreira e garanta seu emprego com Jobeiros"
    />

      <meta property="og:locale" content="pt_BR"/>
      <meta property="og:url" content="https://jobeiros.com"/>
      <meta property="og:site_name" content="Jobeiros.com"/>

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


      <title>Jobeiros</title>
    </head>
    <div className="bg-white text-gray-700">
      <div className="bg-primary p-4">
        <div className="sm:container mx-auto flex items-center justify-between">
            <div className="text-xl font-bold flex justify-center items-center gap-6">
              <Logo/>
              <div className="flex items-center gap-2">
                <Link href="https://instagram.com/jobeiros_" target="blank" className="cursor-pointer">
                  <InstagramLogoIcon className="w-[22px] h-[22px]"/>
                </Link>
                <Link href="https://linkedin.com/company/jobeiros" target="blank"  className="cursor-pointer">
                  <LinkedInLogoIcon className="w-[22px] h-[22px]"/>
                </Link>
                <Link href="https://twitter.com/jobeiros" target="blank" className="cursor-pointer">
                  <TwitterLogoIcon className="w-[22px] h-[22px]"/>
                </Link>
                <Link href="https://www.tiktok.com/@jobeiros_" target="blank" className="cursor-pointer">
                  <PhTiktokLogoLight className="w-[22px] h-[22px]"/>
                </Link>
              </div>
            </div>
          <nav className="flex space-x-4 items-center">
            <a className="hover:underline hidden sm:flex" href="#howItWorks">
              Recursos
            </a>
            <a className="hover:underline hidden sm:flex" href="#plans">
              Planos
            </a>
            <a className="hover:underline hidden sm:flex" href="#faq">
              FAQ
            </a>
            <a className="hover:underline" href="/auth">
              Entrar
            </a>
            <Link href="/auth/register">
              <Button variant="black">Registrar Grátis</Button>
            </Link>
          </nav>
        </div>
      </div>
      <div className="py-12 text-center bg-primary w-screen flex flex-col items-center" style={{borderLeft: 'none !important', borderRight: 'none', borderTop: 'none', borderBottom: '2px solid black', }}>
        <h1 className="text-4xl font-bold mb-4 text-black">Chega de levar não para vagas de emprego</h1>
        <p className="mb-12 max-w-[400px] sm:max-w-[600px]">Te ajudamos a conseguir sua primeira vaga e alavancar sua carreira.</p>
        <div className="flex justify-center w-full">
          <div className="flex items-center gap-4">
              <img src={
                "https://assets-global.website-files.com/65367478fab570f61f1cbbf9/653e9e2549d44197bc417ab5_cv_ilu4.png"
                } loading="lazy" alt="Entrevista de emprego" className="image-cv max-w-[150px] md:max-w-[300px]"/>

              <img src="https://assets-global.website-files.com/65367478fab570f61f1cbbf9/6560d512b67021c7f5f21e67_Union%20(1).svg" loading="lazy" style={{
                transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)", 
                opacity: 1, transformStyle: "preserve-3d"
                }} className="arrow-test-image" alt="Vagas de emprego"/>

              <img src="https://assets-global.website-files.com/65367478fab570f61f1cbbf9/659325477186680090555129_Frame%205%20(3).png" loading="lazy" style={{opacity: 1}} data-w-id="42b1e4bd-670f-fb24-a8d9-dd96d8b49333" alt="Como fazer um curriculo" className="image-blind max-w-[150px] md:max-w-[300px]"/></div>
        </div>
        <div className="flex flex-col items-center justify-center pt-14 gap-6">
          <span className="font-semibold">
                PARCEIROS:
          </span> 
          <div className="flex items-center flex-wrap wrap justify-center gap-4">
                {companies.map((company, index) => {
                  return (
                    <Link href={index == 3 ? 'https://barbiericonsulting.com.br/' : ''} target="blank">
                      <img src={company} key={index} className={`w-[80px] object-contain ${index == 3 && 'w-[140px]'}`}/>
                    </Link>
                  )
                })}
          </div>
        </div>
      </div>
      <div className="w-full sm:container" id="howItWorks">
          <HowItWorks/>
      </div>

      <div className="bg-gray-100 py-12" id="plans">
        <div className="container mx-auto">
          <div className="px-4 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Escolha o plano ideal para você
                </h2>
                <p className="mt-4 text-lg">
                Baixe seu primeiro curriculo totalmente de graça. Sem custos ocultos, sem cartão de crédito. Veja com os próprios olhos a qualidade de nosso material e como é rápido e fácil de fazer.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center rounded-lg bg-[#F97316] px-6 py-3 text-sm font-medium text-white">
                  <GiftIcon className="h-6 w-6" />
                  <span className="ml-3">
                    Use o código JOBEIRO30 e GANHE 30% OFF em sua assinatura para SEMPRE! Use esse código na pagina de pagamento. Mas vá rápido - Faltam apenas 100 vagas!
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap wrap justify-center w-full gap-4 container">
              <Card className="min-w-[330px] w-full max-w-[400px]">
                <CardHeader className="p-4 flex flex-col items-start">
                    <div className="text-2xl font-bold">Starter</div>
                    <div className="text-2xl font-bold">R$ 29,00</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Mensal</div>
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <ul className="grid gap-2">
                        <li>4 Análises de Currículo</li>
                        <li>4 Entrevistas com IA</li>
                        <li>10 Curriculos com IA Generator</li>
                        <li>Suporte 24/7</li>
                    </ul>
                    <Link href="/auth/register">
                      <Button size="lg">Assinar Agora</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="min-w-[330px] w-full max-w-[400px]">
                <CardHeader className="p-4 flex flex-col items-start">
                <div className="text-2xl font-bold">Pro</div>
                <div className="text-2xl font-bold">R$ 49,00</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Mensal</div>
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                <ul className="grid gap-2">
                    <li>8 análises de Currículo</li>
                    <li>8 Entrevistas com IA</li>
                    <li>Curriculos Ilimitados com IA Generator</li>
                    <li>Suporte 24/7</li>
                </ul>
                <Link href="/auth/register">
                  <Button size="lg">Assinar Agora</Button>
                </Link>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-12">
        <h2 className="text-3xl font-bold text-center mb-8">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container">
          <TestimonyCard testimony={{
            text: "O Jobeiros revolucionou nosso processo seletivo, atraindo candidatos excepcionalmente bem-preparados, facilitando nossas contratações.",
            avatar: "/assets/gerente-de-rh.jpeg",
            name: "Ana Júlia",
            role: "Gerente de RH, Itaú."
          }}/>
          <TestimonyCard testimony={{
            text: "Após meses de rejeições, o Jobeiros me ajudou a conseguir um emprego alinhado às minhas habilidades em menos de 15 dias.",
            avatar: "/assets/desenvolvedor-de-software.jpeg",
            name: "Carlos Eduardo",
            role: "Programador, Reserva"
          }}/>
          <TestimonyCard testimony={{
            text: "Com o Jobeiros, consegui meu primeiro estágio em TI no Ifood, graças às dicas cruciais, preparação para entrevistas e análise do meu curriculo (que por sinal tava bem ruim hahaha).",
            avatar: "/assets/estudante-de-ti.jpeg",
            name: "Lucas Martins",
            role: "Estudante de TI, Estácio"
          }}/>
        </div>
      </div>
      <div className="bg-gray-100 py-12" id="faq">
        <div className="mx-auto w-full">
          <Faq/>
        </div>
      </div>
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p>Precisa de ajuda? ojobeiros@gmail.com</p>
            </div>
            <div className="text-right">
              <nav className="flex justify-end space-x-4">
                <a className="hover:underline" href="#howItWorks">
                  Recursos
                </a>
                <a className="hover:underline" href="#plans">
                  Planos
                </a>
                <a className="hover:underline" href="#faq">
                  FAQ
                </a>
              </nav>
            </div>
          </div>
        </div>
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
    </div>
    </>
  )
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}


function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function ViewIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  )
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect width="20" height="5" x="2" y="7" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}



function PhTiktokLogoLight(props: any) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M224 74a50.06 50.06 0 0 1-50-50a6 6 0 0 0-6-6h-40a6 6 0 0 0-6 6v132a22 22 0 1 1-31.43-19.89a6 6 0 0 0 3.43-5.42V88a6 6 0 0 0-7-5.91C52.2 88.28 26 120.05 26 156a74 74 0 0 0 148 0v-43.07A101.28 101.28 0 0 0 224 126a6 6 0 0 0 6-6V80a6 6 0 0 0-6-6m-6 39.8a89.13 89.13 0 0 1-46.5-16.69A6 6 0 0 0 162 102v54a62 62 0 0 1-124 0c0-27.72 18.47-52.48 44-60.38v31.53A34 34 0 1 0 134 156V30h28.29A62.09 62.09 0 0 0 218 85.71Z"></path></svg>);
}
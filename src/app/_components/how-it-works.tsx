import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  return (
    <div className="bg-white p-10">
      <h2 className="text-5xl font-bold text-center text-black">Como funciona?</h2>
      <p className="text-xl text-gray-500 text-center">Da aplicação até a contratação</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:order-2">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-black">Criar Currículo</div>
          </div>
          <h3 className="text-3xl font-semibold mb-4">Criador de Curículo</h3>
          <ul className="list-inside list-disc space-y-2 mb-4">
            <li>Tenha Seu Currículo Pronto em menos de 1 minuto</li>
            <li>Preencha com suas informações e competências</li>
            
            {/* <li>E receba um relatório automático de seu desempenho</li> */}
          </ul>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-semibold text-black">Em breve:</span>
            <ul className="list-inside list-disc">
              <li>Novos layouts para diferentes áreas</li>
            </ul>
          </div>
        </div>
        <div className="relative md:order-1">
              <video
        className="rounded-lg shadow-lg w-full"
        height="300"
        style={{
          aspectRatio: "500/300",
          objectFit: "fill",
        }}
        width="500"
        autoPlay
        loop
        muted
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/curriculo-saas.appspot.com/o/DEVSAMPLE%2FVideos%2F202404011633%20(1).mp4?alt=media&token=6cc8be52-7ad1-4b09-830f-3539383cfa47" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
          {/* <Button className="absolute right-4 bottom-4 bg-primary text-black">Play</Button> */}
        </div>
        <div className="md:order-4">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-black">Análise Currículo</div>
          </div>
          <h3 className="text-3xl font-semibold mb-4">Analise seu currículo com IA</h3>
          <ul className="list-inside list-disc space-y-2 mb-4">
            <li>Insira seu currículo</li>
            <li>Receba feedback e melhorias</li>
            <li>Aumente suas chances</li>
          </ul>
        </div>
        <div className="relative md:order-3">
        <video
                  className="rounded-lg shadow-lg w-full"
                  height="300"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "fill",
                  }}
                  width="500"
                  autoPlay
                  loop
                  muted
                >
                <source src="https://firebasestorage.googleapis.com/v0/b/curriculo-saas.appspot.com/o/DEVSAMPLE%2FVideos%2F_%20analise.mp4?alt=media&token=58f7f565-d08d-436f-ac67-9e643ab59b41" />
                  Seu navegador não suporta a tag de vídeo.
            </video>
          {/* <Button className="absolute right-4 bottom-4 bg-[#F2C94C] text-black">Play</Button> */}
        </div>

        <div className="md:order-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-black">Entrevista</div>
          </div>
          <h3 className="text-3xl font-semibold mb-4">Entrevista com IA</h3>
          <ul className="list-inside list-disc space-y-2 mb-4">
            <li>Preencha as informações da vaga</li>
            <li>Responda as perguntaas</li>
            <li>E receba um relatório automático de seu desempenho</li>
          </ul>
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-semibold text-black">Em breve:</span>
            <ul className="list-inside list-disc">
              <li>Entrevista em vídeo</li>
            </ul>
          </div>
        </div>
        <div className="relative md:order-5">
              <video
                  className="rounded-lg shadow-lg w-full"
                  height="300"
                  style={{
                    aspectRatio: "500/300",
                    objectFit: "fill",
                  }}
                  width="500"
                  autoPlay
                  loop
                  muted
                >
                <source src="https://firebasestorage.googleapis.com/v0/b/curriculo-saas.appspot.com/o/DEVSAMPLE%2FVideos%2F202404011633%20(3).mp4?alt=media&token=3772a376-b5e1-4b43-92b1-29446ed0a7d1" />
                  Seu navegador não suporta a tag de vídeo.
            </video>
          {/* <Button className="absolute right-4 bottom-4 bg-primary text-black">Play</Button> */}
        </div>

        
      </div>
    </div>
  )
}

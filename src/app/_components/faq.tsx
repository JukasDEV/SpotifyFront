
const asks = [
    {
        // Quais tipos de análises de currículo o [Nome do seu SaaS] oferece?

// Resposta: Oferecemos análises detalhadas que incluem feedback sobre o layout, escolha de palavras, otimização de SEO e a adequação do seu currículo para a vaga desejada. Nosso objetivo é maximizar suas chances de ser notado por empregadores.
        question: "Quais tipos de análises de currículo o Jobeiros oferece?",
        answer: "Oferecemos análises detalhadas que incluem feedback sobre o layout, escolha de palavras, otimização de SEO e a adequação do seu currículo para a vaga desejada. Nosso objetivo é maximizar suas chances de ser notado por Recrutadores ."
    },
    {
        question: "Posso personalizar as perguntas e o formato da entrevista?",
        answer: "Sim, você tem total controle sobre as perguntas e o formato da entrevista. Nossa plataforma oferece uma biblioteca de perguntas de exemplo e modelos de entrevista que você pode usar como estão ou personalizar de acordo com as necessidades da sua empresa."
    },
    {
        question: "O que Significa Recrutadores Ativos?",
        answer: "Em nossa plataforma, atualmente contamos com recrutadores de diversas empresas renomadas em busca de novos talentos. Estamos constantemente trabalhando para expandir nossas parcerias e em breve traremos novidades sobre isso. Fique atento!"
    },
    {
        question: "Após o pagamento os tickets são creditados direto na minha conta?",
        answer: "Sim! Após a conclusão do seu pagamento, os tickets serão creditados imediatamente na sua conta, prontos para serem utilizados."
    },
    {
        question: "Que tipo de suporte está disponível se eu encontrar problemas com a plataforma?",
        answer: "Oferecemos suporte abrangente ao cliente para ajudá-lo com quaisquer problemas ou dúvidas que possa ter. Nossa equipe de suporte está disponível por Instagram e Email durante o horário comercial e responderá prontamente às suas perguntas. Também fornecemos documentação, tutoriais e recursos de treinamento para ajudá-lo a aproveitar ao máximo a plataforma."
    }
]


export default function Faq(){
    return (
        <>
        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Perguntas Frequentes</h2>
                    <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                    Tem alguma pergunta? Nós temos as respostas. Se você tiver outras perguntas, sinta-se à vontade para nos enviar uma mensagem no Instagram @Jobeiros_
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="border rounded-lg">
                    {asks.map((item, index) => (
                        <details className="border-b" key={index}>
                            <summary className="p-4 list-none" style={{ fontWeight: 'bold' }}>{item.question}</summary>
                            <div className="p-4 bg-gray-50 dark:bg-gray-950">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}

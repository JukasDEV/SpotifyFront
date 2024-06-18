import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";

  
  interface KoalaWelcomeEmailProps {
    userFirstname: string;
  }
  
  const baseUrl = 'jobeiros.com'
    ? `https://jobeiros.com`
    : "";
  
  export const LeadEmail = ({
    userFirstname,
  }: KoalaWelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>
A plataforma para acelerar a carreira. Simule entrevistas de emprego, aprimore seu currículo e conquiste o mercado com confiança.      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            // src="/assets/JobeirosAmarelo.png"
            src="https://www.jobeiros.com/assets/JobeirosAmarelo.png"
            width="200"
            height="200"
            alt="Logo Jobeiros"
            style={logo}
          />
          <Text style={paragraph}>Olá {userFirstname},</Text>
          <Text style={paragraph}>
          Parabéns você foi selecionado,
          Você acaba de ganhar um cupom de 25% de desconto, use o cupom <Text style={{ fontWeight: 'bold' }}>JOB25</Text>
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://jobeiros.com">
              Comece Agora
            </Button>
          </Section>
          <Text style={paragraph}>
            Atenciosamente,
            <br />
           Equipe Jobeiros
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            {/* TEXTO DE ENDERECO  */}
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  LeadEmail.PreviewProps = {
    userFirstname: "Alan",
  } as KoalaWelcomeEmailProps;
  
  export default LeadEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#FACC15",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  
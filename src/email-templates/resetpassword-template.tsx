import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface DropboxResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
  }
  
  const baseUrl = 'jobeiros.com'
    ? `https://jobeiros.com`
    : "";
  
  export const DropboxResetPasswordEmail = ({
    userFirstname,
    resetPasswordLink,
  }: DropboxResetPasswordEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Jobeiros redefinir sua senha</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
            // https://www.jobeiros.com/assets/JobeirosAmarelo.png"
              src={`${baseUrl}/assets/JobeirosAmarelo.png`}
              width="115"
              height="115"
              alt="Jobeiros"
            />
            <Section>
              <Text style={text}>Olá {userFirstname},</Text>
              <Text style={text}>
              Alguém solicitou recentemente uma mudança de senha para a sua conta Jobeiros.
               Se foi você, você pode definir uma nova senha aqui:
              </Text>
              <Button style={button} href={resetPasswordLink}>
                Redefinir Senha
              </Button>
              <Text style={text}>
              Se você não deseja alterar sua senha ou não fez esta solicitação,
               apenas entre em contato com o suporte.
              </Text>
              <Text style={text}>
              Para manter sua conta segura, por favor, não encaminhe este e-mail para ninguém.
              </Text>
              <Text style={text}>Atenciosamente, Equipe Jobeiros</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  DropboxResetPasswordEmail.PreviewProps = {
    userFirstname: "Alan",
    resetPasswordLink: "https://jobeiros.com",
  } as DropboxResetPasswordEmailProps;
  
  export default DropboxResetPasswordEmail;
  
  const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
  };
  
  const text = {
    fontSize: "16px",
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
  };
  
  const button = {
    backgroundColor: "#FFD700",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "210px",
    padding: "14px 7px",
  };
  
  const anchor = {
    textDecoration: "underline",
  };
  
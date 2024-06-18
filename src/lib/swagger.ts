import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
      apiFolder: 'src/app/api/', 
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'CV SaaS Doc API',
          version: '1.0',
          description: 'Uma solução completa para gerenciamento e otimização de currículos e Entrevistas.', 
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      tagging: true, // Habilita a agrupação por tags
    });
    return spec;
  };
  
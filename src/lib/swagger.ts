import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
      apiFolder: 'src/app/api/', 
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API DOC SPOTDEEZER',
          version: '1.0',
          description: 'A MELHOR PLATAFORMA DE MÚSICA BRASILEIRA.', 
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
  
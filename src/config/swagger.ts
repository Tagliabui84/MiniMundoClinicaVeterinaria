import swaggerJSDoc from "swagger-jsdoc";
import type { SwaggerDefinition } from "swagger-jsdoc";


const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API - Mini Mundo Clínica Veterinária",
    version: "1.0.0",
    description:
      "API REST para gestão de uma clínica veterinária: usuários (recepcionistas e " +
      "veterinários), clientes, animais, consultas e prontuários. " +
      "A maioria das rotas exige autenticação via JWT (veja o esquema `bearerAuth` abaixo).",
  },
  servers: [
    {
      url: "http://localhost:{port}",
      description: "Servidor local de desenvolvimento",
      variables: {
        port: {
          default: "3333",
        },
      },
    },
  ],
  tags: [
    { name: "Usuários", description: "Cadastro e login de recepcionistas/veterinários" },
    { name: "Clientes", description: "Donos dos animais atendidos pela clínica" },
    { name: "Animais", description: "Animais cadastrados, vinculados a um cliente" },
    { name: "Veterinários", description: "Perfil profissional vinculado a um usuário" },
    { name: "Consultas", description: "Agendamento de consultas (animal + veterinário)" },
    { name: "Prontuários", description: "Registro clínico gerado a partir de uma consulta" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          'Envie o token retornado por "POST /usuarios/login" no header ' +
          '"Authorization: Bearer {token}".',
      },
    },
    schemas: {
      ErroResposta: {
        type: "object",
        properties: {
          error: { type: "string", example: "Mensagem descrevendo o erro" },
        },
      },
      Usuario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Dra Fernanda Silva" },
          email: { type: "string", format: "email", example: "fer.vet@clinica.com" },
          tipo: {
            type: "string",
            enum: ["RECEPCIONISTA", "VETERINARIO"],
            example: "VETERINARIO",
          },
        },
      },
      NovoUsuario: {
        type: "object",
        required: ["nome", "email", "senha", "tipo"],
        properties: {
          nome: { type: "string", example: "Dra Fernanda Silva" },
          email: { type: "string", format: "email", example: "fer.vet@clinica.com" },
          senha: { type: "string", format: "password", example: "senha123456789" },
          tipo: {
            type: "string",
            enum: ["RECEPCIONISTA", "VETERINARIO"],
            example: "VETERINARIO",
          },
        },
      },
      LoginInput: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", format: "email", example: "fer.vet@clinica.com" },
          senha: { type: "string", format: "password", example: "senha123456789" },
        },
      },
      LoginResposta: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
        },
      },
      Cliente: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Mariana Oliveira" },
          cpf: { type: "string", example: "123.456.789-00" },
          email: { type: "string", format: "email", example: "mariana.oliveira@email.com" },
          telefone: { type: "string", example: "(11) 98888-7777" },
        },
      },
      NovoCliente: {
        type: "object",
        required: ["nome", "cpf", "email", "telefone"],
        properties: {
          nome: { type: "string", example: "Mariana Oliveira" },
          cpf: { type: "string", example: "123.456.789-00" },
          email: { type: "string", format: "email", example: "mariana.oliveira@email.com" },
          telefone: { type: "string", example: "(11) 98888-7777" },
        },
      },
      Animal: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          clienteId: { type: "integer", example: 1 },
          nome: { type: "string", example: "Thor" },
          especie: { type: "string", example: "Cão" },
          raca: { type: "string", example: "Golden Retriever" },
          dataNascimento: { type: "string", format: "date-time", example: "2022-03-15T00:00:00.000Z" },
        },
      },
      NovoAnimal: {
        type: "object",
        required: ["clienteId", "nome", "especie", "raca", "dataNascimento"],
        properties: {
          clienteId: { type: "integer", example: 1 },
          nome: { type: "string", example: "Thor" },
          especie: { type: "string", example: "Cão" },
          raca: { type: "string", example: "Golden Retriever" },
          dataNascimento: { type: "string", format: "date-time", example: "2022-03-15" },
        },
      },
      Veterinario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          usuarioId: { type: "integer", example: 2 },
          crmv: { type: "string", example: "CRMV-RJ2222" },
          email: { type: "string", format: "email", example: "fer.vet@clinica.com" },
          especialidade: { type: "string", example: "Ortopedia" },
        },
      },
      NovoVeterinario: {
        type: "object",
        required: ["usuarioId", "crmv", "email", "especialidade"],
        properties: {
          usuarioId: { type: "integer", example: 2 },
          crmv: { type: "string", example: "CRMV-RJ2222" },
          email: { type: "string", format: "email", example: "fer.vet@clinica.com" },
          especialidade: { type: "string", example: "Ortopedia" },
        },
      },
      Consulta: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          animalId: { type: "integer", example: 1 },
          veterinarioId: { type: "integer", example: 1 },
          dataHorario: { type: "string", format: "date-time", example: "2026-09-12T10:30:00Z" },
          status: {
            type: "string",
            enum: ["AGENDADA", "CANCELADA", "CONCLUIDA"],
            example: "AGENDADA",
          },
        },
      },
      NovaConsulta: {
        type: "object",
        required: ["animalId", "veterinarioId", "dataHorario", "status"],
        properties: {
          animalId: { type: "integer", example: 1 },
          veterinarioId: { type: "integer", example: 1 },
          dataHorario: { type: "string", format: "date-time", example: "2026-09-12T10:30:00Z" },
          status: {
            type: "string",
            enum: ["AGENDADA", "CANCELADA", "CONCLUIDA"],
            example: "AGENDADA",
          },
        },
      },
      Prontuario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          consultaId: { type: "integer", example: 1 },
          diagnostico: { type: "string", example: "Dermatite leve na região do dorso." },
          prescricao: {
            type: "string",
            example: "Shampoo antisséptico 2x por semana durante 15 dias.",
          },
          dataRetorno: { type: "string", format: "date-time", example: "2026-09-16T14:00:00Z" },
        },
      },
      NovoProntuario: {
        type: "object",
        required: ["consultaId", "diagnostico", "prescricao", "dataRetorno"],
        properties: {
          consultaId: { type: "integer", example: 1 },
          diagnostico: { type: "string", example: "Dermatite leve na região do dorso." },
          prescricao: {
            type: "string",
            example: "Shampoo antisséptico 2x por semana durante 15 dias.",
          },
          dataRetorno: { type: "string", format: "date-time", example: "2026-09-16T14:00:00Z" },
        },
      },
    },
  },
};

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
 
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
});

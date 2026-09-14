import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CriarVeterinarioDTO {
  usuarioId: number;
  crmv: string;
  email: string;
  especialidade: string;
}

interface AtualizarVeterinarioDTO {
  crmv?: string;
  email?: string;
  especialidade?: string;
}


async function criar(dados: CriarVeterinarioDTO) {
  return prisma.veterinario.create({
    data: {
      usuarioId: dados.usuarioId,
      crmv: dados.crmv,
      email: dados.email,
      especialidade: dados.especialidade,
    },
  });
}


async function listarTodos() {
  return prisma.veterinario.findMany({
    include: {
      usuario: true,
    },
  });
}


async function buscarPorId(id: number) {
  return prisma.veterinario.findUnique({
    where: { id },
    include: {
      usuario: true,
      consultas: true,
    },
  });
}


async function buscarPorCrmv(crmv: string) {
  return prisma.veterinario.findUnique({
    where: { crmv },
  });
}


async function atualizar(id: number, dados: AtualizarVeterinarioDTO) {
  return prisma.veterinario.update({
    where: { id },
    data: dados,
  });
}


async function deletar(id: number) {
  return prisma.veterinario.delete({
    where: { id },
  });
}

export {
  criar,
  listarTodos,
  buscarPorId,
  buscarPorCrmv,
  atualizar,
  deletar,
};

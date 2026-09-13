import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';


interface CriarClienteInput {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}


const SELECT_CLIENTE_PUBLICO = {
  id: true,
  nome: true,
  cpf: true,
  email: true,
  telefone: true,
} as const;

export async function criarCliente(dados: CriarClienteInput) {
  const clienteCriado = await prisma.cliente.create({
    data: dados,
    select: SELECT_CLIENTE_PUBLICO,
  });
  return clienteCriado;
}

export async function listarClientes() {
  return prisma.cliente.findMany({
    select: SELECT_CLIENTE_PUBLICO,
    orderBy: { id: 'asc' },
  });
}

export async function buscarClientePorId(id: number) {
  const cliente = await prisma.cliente.findUnique({
    where: { id },
    select: SELECT_CLIENTE_PUBLICO,
  });

  if (!cliente) {
    throw new AppError('Cliente não encontrado', 404);
  }

  return cliente;
}

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const criarCliente = async (req: Request, res: Response) => {
  try {
    const { nome, cpf, email, telefone } = req.body;
    const cliente = await prisma.cliente.create({
      data: { nome, cpf, email, telefone },
    });
    res.json(cliente);
  } catch {
    res.status(400).json({ error: "Erro ao criar cliente" });
  }
};

export const listarClientes = async (_req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({ include: { animais: true } });
  res.json(clientes);
};

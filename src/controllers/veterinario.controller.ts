import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const criarVeterinario = async (req: Request, res: Response) => {
  try {
    const { usuarioId, crmv, email, especialidade } = req.body;
    const vet = await prisma.veterinario.create({
      data: { usuarioId, crmv, email, especialidade },
    });
    res.json(vet);
  } catch {
    res.status(400).json({ error: "Erro ao criar veterinário" });
  }
};

export const listarVeterinarios = async (_req: Request, res: Response) => {
  const vets = await prisma.veterinario.findMany({ include: { usuario: true } });
  res.json(vets);
};

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const criarAnimal = async (req: Request, res: Response) => {
  try {
    const { clienteId, nome, especie, raca, dataNascimento } = req.body;
    const animal = await prisma.animal.create({
      data: { clienteId, nome, especie, raca, dataNascimento },
    });
    res.json(animal);
  } catch {
    res.status(400).json({ error: "Erro ao criar animal" });
  }
};

export const listarAnimais = async (_req: Request, res: Response) => {
  const animais = await prisma.animal.findMany({ include: { cliente: true } });
  res.json(animais);
};

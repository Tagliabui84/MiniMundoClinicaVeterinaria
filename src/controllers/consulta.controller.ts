import {PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const criarConsulta = async (req: Request, res: Response) => {
  try{
    const { animalId, veterinarioId, dataHorario, status} = req.body;
    const consulta = await prisma.consulta.create({
      data: { animalId, veterinarioId, dataHorario, status },
    });
    res.json(consulta);
  } catch {
    res.status(400).json({ error: "Erro ao criar consulta" });
  }
};

export const listarConsultas = async (_req: Request, res: Response) => {
  const consultas = await prisma.consulta.findMany({ include: { animal: true, veterinario: true, prontuario: true } });
  res.json(consultas);
}
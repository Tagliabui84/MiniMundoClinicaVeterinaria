import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const criarProntuario = async (req: Request, res: Response) => {
  try {
    const { consultaId, diagnostico, prescricao, dataRetorno } = req.body;
    const prontuario = await prisma.prontuario.create({
      data: { consultaId, diagnostico, prescricao, dataRetorno },
    });
    res.json(prontuario);
  } catch {
    res.status(400).json({ error: "Erro ao criar prontuário" });
  }
};

export const listarProntuarios = async (_req: Request, res: Response) => {
  const prontuarios = await prisma.prontuario.findMany({ include: { consulta: true } });
  res.json(prontuarios);
};

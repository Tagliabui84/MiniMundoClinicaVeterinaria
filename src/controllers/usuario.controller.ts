import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, tipo } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: hash, tipo },
    });
    res.json(usuario);
  } catch {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    process.env.JWT_SECRET || "segredo",
    { expiresIn: "1h" }
  );

  res.json({ token });
};

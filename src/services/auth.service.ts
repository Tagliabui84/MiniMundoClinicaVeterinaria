// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middlewares/error.middleware';

interface LoginInput {
  email: string;
  senha: string;
}

export async function login(dados: LoginInput) {
  
  const usuario = await prisma.usuario.findUnique({
    where: { email: dados.email },
  });

  
  if (!usuario || (usuario.tipo !== 'veterinario' && usuario.tipo !== 'recepcionista')) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  
  const senhaConfere = await bcrypt.compare(
    dados.senha,
    usuario?.senha ?? ''
  );

  if (!senhaConfere) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET as string,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] }
  );

  
  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
    },
  };
}

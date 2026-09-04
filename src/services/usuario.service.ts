
import { prisma } from '../config/prisma';

export class UsuarioService {
  async criarUsuario(nome: string, email: string, senhaHash: string, role: 'veterinario' | 'recepcionista') {
    return prisma.usuario.create({
      data: { nome, email, senha: senhaHash, tipo: role },
    });
  }

  async buscarPorEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }
}

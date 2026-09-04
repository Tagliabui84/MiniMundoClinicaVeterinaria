import { prisma } from "../config/prisma";

export class ProntuarioService {
  async criar(
    consultaId: number,
    diagnostico: string,
    prescricao: string,
    dataRetorno: string | Date
  ) {
    return await prisma.prontuario.create({
      data: {
        consultaId: consultaId,
        diagnostico: diagnostico,
        prescricao: prescricao,
        dataRetorno: new Date(dataRetorno)
      }
    });
  }

  async listar() {
    return await prisma.prontuario.findMany({
      include: {
        consulta: true
      }
    });
  }
}
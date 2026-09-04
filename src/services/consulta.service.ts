import { prisma } from "../config/prisma";

export class ConsultaService {
  async agendar(animalId: number, veterinarioId: number, horario: string | Date) {
    const dataHorario = new Date(horario);
    
    return await prisma.consulta.create({
      data: {
        animalId: animalId,
        veterinarioId: veterinarioId,
        dataHorario: dataHorario,
        status: "AGENDADA"
      }
    });
  }

  async listar() {
    return await prisma.consulta.findMany({
      include: {
        animal: true,
        veterinario: true,
        prontuario: true
      }
    });
  }
}
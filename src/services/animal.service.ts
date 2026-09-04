import { prisma } from "../config/prisma";

export class AnimalService {
  
  async criar(nome: string, especie: string, raca: string, dataNascimento: string | Date, clienteId: number) {
    return prisma.animal.create({ 
      data: { 
        nome, 
        especie, 
        raca, 
        dataNascimento: new Date(dataNascimento), // Converte a string de data que vem do HTTP para o objeto Date do Prisma
        clienteId 
      } 
    });
  }

  async listar() {
    
    return prisma.animal.findMany({ include: { cliente: true } });
  }
}
// backend/src/services/petService.ts

import prisma from '../config/database'; // Importa a instância do Prisma Client

// Função para buscar todos os pets
export const findAllPets = async () => {
  try {
    const pets = await prisma.pet.findMany({
      // Você pode adicionar opções aqui, como ordenação, filtros, etc.
      // orderBy: { createdAt: 'desc' }
    });
    return pets;
  } catch (error) {
    // Em uma aplicação real, trate o erro de forma mais robusta (log, etc.)
    console.error('Erro ao buscar pets:', error);
    throw new Error('Não foi possível buscar os pets no banco de dados.');
  }
};

// Função para criar um pet (Exemplo para o futuro)
// export const createPet = async (petData: { name: string; species: string; breed?: string; birthDate?: Date }) => {
//   try {
//     const newPet = await prisma.pet.create({
//       data: petData,
//     });
//     return newPet;
//   } catch (error) {
//     console.error("Erro ao criar pet:", error);
//     throw new Error('Não foi possível criar o pet.');
//   }
// };

// Adicione outras funções de serviço conforme necessário (findById, update, delete)...

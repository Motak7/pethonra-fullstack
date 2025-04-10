// backend/src/controllers/petController.ts

import { Request, Response } from 'express';
import * as PetService from '../services/petService'; // Importa as funções do serviço

// Controller para listar todos os pets
export const listPets = async (req: Request, res: Response) => {
  try {
    const pets = await PetService.findAllPets(); // Chama a função do serviço
    res.status(200).json(pets); // Envia a resposta com status 200 OK e os dados
  } catch (error) {
    // Se o serviço lançar um erro, captura e envia uma resposta de erro
    if (error instanceof Error) {
      res.status(500).json({ message: "Erro ao buscar pets.", error: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido ao buscar pets." });
    }
  }
};

// Controller para criar um pet (Exemplo para o futuro)
// export const createNewPet = async (req: Request, res: Response) => {
//   try {
//     // Em uma app real, valide req.body aqui antes de passar para o serviço
//     const newPet = await PetService.createPet(req.body);
//     res.status(201).json(newPet); // Status 201 Created
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: "Erro ao criar pet.", error: error.message });
//     } else {
//       res.status(500).json({ message: "Erro desconhecido ao criar pet." });
//     }
//   }
// };

// Adicione outros controllers conforme necessário...
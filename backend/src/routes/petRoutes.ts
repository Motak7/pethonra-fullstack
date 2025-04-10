// backend/src/routes/petRoutes.ts

import { Router } from 'express';
import * as PetController from '../controllers/petController'; // Importa os controllers

const router = Router();

// Define a rota GET para a raiz deste router ('/') que chama PetController.listPets
// A URL completa será definida ao montar este router no server.ts (ex: /api/pets)
router.get('/', PetController.listPets);

// Define a rota POST para criar um pet (Exemplo para o futuro)
// router.post('/', PetController.createNewPet);

// Adicione outras rotas (ex: GET /:id, PUT /:id, DELETE /:id) aqui...

export default router; // Exporta o router configurado
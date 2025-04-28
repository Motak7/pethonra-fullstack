// backend/src/controllers/productController.ts

import { Request, Response } from 'express';
import * as ProductService from '../services/productService';
// 👇 1. Importar os schemas Zod de validação
import { ProductCreateSchema, ProductUpdateSchema } from '../validation/productSchemas';

// Controller para listar todos os produtos (sem alterações na lógica principal)
export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro no controller listProducts:", error); // Log do erro
    res.status(500).json({ message: "Erro interno ao buscar produtos." });
  }
};

// Controller para buscar um produto pelo ID (sem alterações na lógica principal)
export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Validação de ID (simples - poderia ser mais robusta com Zod ou regex)
  if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "ID inválido fornecido." });
  }
  try {
    const product = await ProductService.findProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Erro no controller getProductDetails para ID ${id}:`, error); // Log do erro
    res.status(500).json({ message: "Erro interno ao buscar detalhes do produto." });
  }
};

// Controller para criar um novo produto (COM VALIDAÇÃO ZOD)
export const createNewProduct = async (req: Request, res: Response) => {
  // 👇 2. Validar req.body usando o schema Zod de criação
  const validationResult = ProductCreateSchema.safeParse(req.body);

  // Se a validação falhar, retorna erro 400 com detalhes
  if (!validationResult.success) {
    return res.status(400).json({
      message: "Dados inválidos para criação do produto.",
      // Formata os erros para fácil consumo pelo frontend
      errors: validationResult.error.flatten().fieldErrors,
    });
  }

  // Se a validação passar, usa os dados validados e tipados
  const productData = validationResult.data;

  try {
    const newProduct = await ProductService.createProduct(productData);
    res.status(201).json(newProduct); // 201 Created
  } catch (error) {
    // Tratar erros específicos vindos do serviço/Prisma
    if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('sku')) {
        // Exemplo: Erro de constraint única no SKU
        return res.status(409).json({ message: "SKU já cadastrado." }); // 409 Conflict
    }
    console.error("Erro no controller createNewProduct:", error); // Log do erro
    res.status(500).json({ message: "Erro interno no servidor ao criar produto." });
  }
};

// Controller para atualizar um pet existente (COM VALIDAÇÃO ZOD)
export const updateExistingProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
   // Validação de ID
  if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "ID inválido fornecido." });
  }

  // 👇 3. Validar req.body usando o schema Zod de atualização (parcial)
  const validationResult = ProductUpdateSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Dados inválidos para atualização do produto.",
      errors: validationResult.error.flatten().fieldErrors,
    });
  }

  // Pega os dados validados (apenas os campos presentes e válidos)
  const productData = validationResult.data;

  // Verifica se pelo menos um campo válido foi enviado
  if (Object.keys(productData).length === 0) {
      return res.status(400).json({ message: "Nenhum dado válido fornecido para atualização." });
  }

  try {
    const updatedProduct = await ProductService.updateProduct(id, productData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Tratar erro se o produto não for encontrado pelo serviço
    if (error instanceof Error && error.message.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
    }
    // Tratar erro de SKU duplicado ao atualizar, se SKU for enviado
     if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('sku')) {
        return res.status(409).json({ message: "SKU já pertence a outro produto." });
    }
    console.error(`Erro no controller updateExistingProduct para ID ${id}:`, error); // Log do erro
    res.status(500).json({ message: "Erro interno no servidor ao atualizar produto." });
  }
};

// Controller para deletar um pet existente (sem validação de body necessária)
export const deleteExistingProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
   // Validação de ID
   if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: "ID inválido fornecido." });
  }
  try {
    await ProductService.deleteProduct(id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    // Tratar erro se o produto não for encontrado pelo serviço
    if (error instanceof Error && error.message.includes("não encontrado")) {
        return res.status(404).json({ message: error.message });
    }
    console.error(`Erro no controller deleteExistingProduct para ID ${id}:`, error); // Log do erro
    res.status(500).json({ message: "Erro interno no servidor ao deletar produto." });
  }
};
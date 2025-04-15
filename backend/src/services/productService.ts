// backend/src/services/productService.ts
import prisma from '../config/database';
import { Prisma } from '../generated/prisma'; // Tipos gerados para Product

export type ProductCreateInput = Prisma.ProductCreateInput;
export type ProductUpdateInput = Prisma.ProductUpdateInput;

export const findAllProducts = async () => {
  // ... (lógica similar a findAllPets, mas com prisma.product.findMany) ...
  console.log("Buscando todos os produtos...");
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }});
  console.log(`Encontrados ${products.length} produtos.`);
  return products;
  // Adicionar try/catch robusto
};

export const findProductById = async (id: string) => {
  // ... (lógica similar a findPetById, mas com prisma.product.findUnique) ...
  console.log(`Buscando produto com ID: ${id}`);
  const product = await prisma.product.findUnique({ where: { id: id } });
  if (!product) { console.log(`Produto ${id} não encontrado.`); }
  else { console.log(`Produto encontrado: ${product.name}`); }
  return product;
   // Adicionar try/catch robusto
};

export const createProduct = async (productData: ProductCreateInput) => {
  // ... (lógica similar a createPet, mas com prisma.product.create) ...
   console.log("Criando novo produto com dados:", productData);
   const newProduct = await prisma.product.create({ data: productData });
   console.log(`Produto criado com ID: ${newProduct.id}`);
   return newProduct;
    // Adicionar try/catch robusto
};

export const updateProduct = async (id: string, productData: ProductUpdateInput) => {
   // ... (lógica similar a updatePet, mas com prisma.product.update) ...
   console.log(`Atualizando produto ID: ${id}`, productData);
   try {
       const updatedProduct = await prisma.product.update({
           where: { id: id },
           data: productData,
       });
       console.log(`Produto ${id} atualizado.`);
       return updatedProduct;
   } catch (error) {
       if ((error as any).code === 'P2025') { throw new Error('Produto não encontrado para atualização.'); }
       throw new Error('Não foi possível atualizar o produto.');
   }
};

export const deleteProduct = async (id: string) => {
   // ... (lógica similar a deletePet, mas com prisma.product.delete) ...
    console.log(`Deletando produto ID: ${id}`);
   try {
       await prisma.product.delete({ where: { id: id } });
       console.log(`Produto ${id} deletado.`);
   } catch (error) {
       if ((error as any).code === 'P2025') { throw new Error('Produto não encontrado para deleção.'); }
       throw new Error('Não foi possível deletar o produto.');
   }
};
// backend/src/validation/productSchemas.ts
import { z } from 'zod';

// Schema base com regras comuns
const baseProductSchema = z.object({
  name: z.string().min(3, { message: "Nome precisa ter pelo menos 3 caracteres." }),
  description: z.string().min(10, { message: "Descrição precisa ter pelo menos 10 caracteres." }),
  price: z.number().positive({ message: "Preço deve ser um número positivo." }),
  sku: z.string().min(3, { message: "SKU precisa ter pelo menos 3 caracteres." }),
      // .regex(/^[A-Z0-9-]+$/, { message: "SKU pode conter apenas letras maiúsculas, números e hífens."}), // Exemplo de regex
  stock: z.number().int().min(0, { message: "Estoque não pode ser negativo." }),
  imageUrl: z.string().url({ message: "URL da imagem inválida." }).optional().or(z.literal('')), // URL válida ou string vazia
  // category: z.string().optional(), // Se usar categoria
});

// Schema para CRIAR um produto (todos os campos obrigatórios do base)
export const ProductCreateSchema = baseProductSchema;
// Ou se algum campo base fosse opcional na criação:
// export const ProductCreateSchema = baseProductSchema.required({ name: true, ... });

// Schema para ATUALIZAR um produto (todos os campos são opcionais na atualização)
// Usamos `.partial()` para tornar todos os campos do base opcionais.
export const ProductUpdateSchema = baseProductSchema.partial();

// Exporta os tipos inferidos (útil no controller)
export type ProductCreateInputType = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateInputType = z.infer<typeof ProductUpdateSchema>;
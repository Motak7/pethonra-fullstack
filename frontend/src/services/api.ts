// frontend/src/services/api.ts

// --- Interfaces de Dados ---

// Interface para os dados do Produto (deve espelhar o modelo Prisma do backend)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Ajuste para string se usar Decimal no backend e precisar tratar
  sku: string;
  stock: number;
  imageUrl?: string | null;
  // category?: string | null; // Descomente/adicione se usar categorias
  createdAt: string; // Datas da API geralmente vêm como string ISO 8601
  updatedAt: string;
}

// Interface para dados enviados ao criar um Produto
export interface ProductCreateData {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  imageUrl?: string;
  // category?: string;
}

// Interface para dados enviados ao atualizar um Produto (campos opcionais)
export interface ProductUpdateData {
  name?: string;
  description?: string;
  price?: number;
  sku?: string; // Geralmente SKU não é atualizado, mas depende da regra de negócio
  stock?: number;
  imageUrl?: string | null;
  // category?: string | null;
}


// --- Configuração da API ---

// Lê a URL base da API do arquivo .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Função auxiliar para tratar respostas da API e erros comuns
const handleApiResponse = async (response: Response) => {
  // Se a resposta não for OK (status não for 2xx)
  if (!response.ok) {
    let errorMessage = `Erro na API: ${response.statusText} (Status: ${response.status})`;
    // Tenta obter uma mensagem de erro mais detalhada do corpo JSON da resposta
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Ignora erro ao parsear JSON se não houver corpo ou não for JSON
    }
    throw new Error(errorMessage);
  }
  // Para respostas 204 No Content (DELETE), não há corpo para parsear
  if (response.status === 204) {
    return; // Retorna undefined (void)
  }
  // Para outras respostas OK (200, 201), parseia o corpo JSON
  return response.json();
};


// --- Funções de Serviço CRUD para Produtos ---

/**
 * Busca todos os produtos da API.
 * @returns Promise<Product[]> - Uma promessa que resolve para um array de produtos.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  if (!API_BASE_URL) throw new Error("URL da API não definida em NEXT_PUBLIC_API_URL.");
  try {
    const response = await fetch(`${API_BASE_URL}/products`); // Endpoint de Produtos
    return await handleApiResponse(response);
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    // Re-lança o erro para o componente que chamou tratar
    throw error;
  }
};

/**
 * Busca um produto específico pelo seu ID.
 * @param id - O ID do produto a ser buscado.
 * @returns Promise<Product> - Uma promessa que resolve para o produto encontrado.
 */
export const getProduct = async (id: string): Promise<Product> => {
  if (!API_BASE_URL) throw new Error("URL da API não definida.");
  if (!id) throw new Error("ID do Produto é necessário para busca.");
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`); // Endpoint de Produto por ID
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Falha ao buscar produto ${id}:`, error);
    throw error;
  }
};

/**
 * Adiciona um novo produto através da API.
 * @param productData - Os dados do produto a ser criado.
 * @returns Promise<Product> - Uma promessa que resolve para o produto recém-criado.
 */
export const addProduct = async (productData: ProductCreateData): Promise<Product> => {
   if (!API_BASE_URL) throw new Error("URL da API não definida.");
    try {
        const response = await fetch(`${API_BASE_URL}/products`, { // Endpoint de Produtos
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error("Falha ao adicionar produto:", error);
        throw error;
    }
};

/**
 * Atualiza um produto existente pelo seu ID.
 * @param id - O ID do produto a ser atualizado.
 * @param productData - Os dados (parciais ou completos) a serem atualizados.
 * @returns Promise<Product> - Uma promessa que resolve para o produto atualizado.
 */
export const updateProductData = async (id: string, productData: ProductUpdateData): Promise<Product> => {
    if (!API_BASE_URL) throw new Error("URL da API não definida.");
    if (!id) throw new Error("ID do Produto é necessário para atualização.");
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, { // Endpoint de Produto por ID
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error(`Falha ao atualizar produto ${id}:`, error);
        throw error;
    }
};

/**
 * Remove um produto pelo seu ID.
 * @param id - O ID do produto a ser removido.
 * @returns Promise<void> - Uma promessa que resolve quando a remoção é concluída.
 */
export const removeProduct = async (id: string): Promise<void> => {
    if (!API_BASE_URL) throw new Error("URL da API não definida.");
    if (!id) throw new Error("ID do Produto é necessário para remoção.");
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, { // Endpoint de Produto por ID
            method: 'DELETE',
        });
        await handleApiResponse(response); // Trata o status 204
    } catch (error) {
        console.error(`Falha ao remover produto ${id}:`, error);
        throw error;
    }
};
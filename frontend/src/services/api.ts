// frontend/src/services/api.ts

// Definindo um tipo para os dados do Pet que esperamos da API
// Idealmente, este tipo deve corresponder ao modelo Prisma no backend
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string | null;
  birthDate?: string | null; // Datas geralmente vêm como strings ISO da API JSON
  createdAt: string;
  updatedAt: string;
}

// Pega a URL base da API do arquivo .env.local
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para buscar todos os pets
export const fetchPets = async (): Promise<Pet[]> => {
  if (!API_BASE_URL) {
    throw new Error(
      'A variável de ambiente NEXT_PUBLIC_API_URL não está definida.'
    );
  }

  try {
    // Faz a requisição GET para o endpoint /pets (completa: http://localhost:3333/api/pets)
    const response = await fetch(`${API_BASE_URL}/pets`);

    // Verifica se a requisição foi bem-sucedida (status 2xx)
    if (!response.ok) {
      // Se não foi ok, tenta pegar a mensagem de erro do corpo, senão usa o statusText
      const errorData = await response.json().catch(() => ({})); // Tenta parsear erro JSON
      throw new Error(
        errorData.message ||
          `Erro na API: ${response.statusText} (Status: ${response.status})`
      );
    }

    // Parseia a resposta JSON e retorna os dados tipados como Pet[]
    const pets: Pet[] = await response.json();
    return pets;
  } catch (error) {
    console.error('Falha ao buscar pets:', error);
    // Re-lança o erro para que o componente que chamou possa tratá-lo
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ocorreu um erro desconhecido ao buscar dados da API.');
  }
};

// Você pode adicionar outras funções aqui para outras rotas (createPet, deletePet, etc.)

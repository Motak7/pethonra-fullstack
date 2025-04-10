// frontend/src/app/page.tsx
'use client'; // Necessário no App Router para usar hooks como useState/useEffect

import React, { useState, useEffect } from 'react';
import { fetchPets, Pet } from '../services/api'; // Importa a função e o tipo do nosso serviço

export default function HomePage() {
  // Estados para armazenar os pets, status de carregamento e erros
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados quando o componente montar
  useEffect(() => {
    // Define uma função async dentro do useEffect para poder usar await
    const loadPets = async () => {
      setIsLoading(true); // Inicia o carregamento
      setError(null); // Limpa erros anteriores
      try {
        const data = await fetchPets(); // Chama a função do serviço api.ts
        setPets(data); // Armazena os dados no estado
      } catch (err) {
        // Se ocorrer um erro na chamada da API, armazena a mensagem de erro
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setIsLoading(false); // Finaliza o carregamento, independentemente de sucesso ou erro
      }
    };

    loadPets(); // Executa a função de carregamento
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez na montagem

  // Renderização condicional baseada nos estados
  return (
    <main className="container mx-auto p-4 pt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Pets - PetHonra</h1>

      {isLoading && <p className="text-center text-gray-500">Carregando pets...</p>}

      {error && <p className="text-center text-red-500">Erro ao carregar: {error}</p>}

      {!isLoading && !error && (
        <div>
          {pets.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum pet encontrado.</p>
          ) : (
            <ul className="space-y-4">
              {pets.map((pet) => (
                <li key={pet.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold">{pet.name}</h2>
                  <p className="text-gray-700">Espécie: {pet.species}</p>
                  {pet.breed && <p className="text-gray-600">Raça: {pet.breed}</p>}
                  {pet.birthDate && <p className="text-gray-500 text-sm">Nascimento: {new Date(pet.birthDate).toLocaleDateString()}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
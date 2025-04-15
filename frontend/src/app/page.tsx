// frontend/src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
// 👇 Adicionar import do ProductForm e tipos/funções necessárias
import { fetchProducts, addProduct, Product, ProductCreateData } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm'; // <--- Importar o formulário

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 👇 Estados para controlar o formulário de adição
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Função para carregar produtos (mantida)
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao buscar produtos.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para carregar produtos na montagem (mantido)
  useEffect(() => {
    loadProducts();
  }, []);

  // 👇 Função para lidar com a submissão do formulário de ADIÇÃO
  const handleAddProduct = async (formData: ProductCreateData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Não precisamos do tipo ProductUpdateData aqui, garantimos que é ProductCreateData
      await addProduct(formData as ProductCreateData);
      setShowAddForm(false); // Fecha o formulário
      await loadProducts(); // Recarrega a lista de produtos
      // Poderia adicionar o novo produto localmente para otimizar:
      // setProducts(prev => [newProduct, ...prev]);
    } catch (err) {
       setSubmitError(err instanceof Error ? err.message : "Erro ao adicionar produto.");
       // Não fecha o formulário em caso de erro para o usuário ver
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <main className="container mx-auto p-4 pt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Nossos Produtos - PetHonra</h1>
        {/* 👇 Botão para mostrar o formulário de adição */}
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Adicionar Produto
        </button>
      </div>

      {/* 👇 Renderização condicional do Formulário de Adição */}
      {showAddForm && (
         <div className="mb-8 p-4 border rounded-lg bg-gray-50">
            {/* Passa a função de submit e a de cancelar */}
            <ProductForm
                onSubmit={handleAddProduct}
                isLoading={isSubmitting}
                onCancel={() => {
                    setShowAddForm(false);
                    setSubmitError(null); // Limpa erro ao cancelar
                }}
            />
             {/* Exibe erro de submissão, se houver */}
            {submitError && <p className="text-red-500 mt-2 text-sm">{submitError}</p>}
         </div>
      )}


      {/* Seção da Lista de Produtos (mantida como antes, com as adições) */}
      {isLoading && <p className="text-center text-gray-500">Carregando produtos...</p>}
      {error && <p className="text-center text-red-500">Erro ao carregar: {error}</p>}
      {!isLoading && !error && (
        <div>
          {products.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                // Adicionar botões Editar/Deletar ao ProductCard ou aqui depois
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
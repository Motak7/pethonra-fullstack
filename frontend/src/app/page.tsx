// frontend/src/app/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
// 👇 Imports atualizados para incluir mais funções e tipos
import {
  fetchProducts,
  addProduct,
  updateProductData,
  removeProduct,
  Product,
  ProductCreateData,
  ProductUpdateData
} from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para o formulário/modal
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Guarda o produto sendo editado
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Função para carregar produtos da API
  const loadProducts = useCallback(async () => {
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
  }, []); // useCallback para evitar recriação desnecessária

  // Carrega produtos na montagem inicial
  useEffect(() => {
    loadProducts();
  }, [loadProducts]); // Adiciona loadProducts como dependência

  // Função para fechar o formulário e resetar estados relacionados
  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  // Função para lidar com o clique no botão "Adicionar Produto"
  const handleShowAddForm = () => {
    setEditingProduct(null); // Garante que não estamos editando
    setShowForm(true);
  };

   // 👇 Função para lidar com o clique no botão "Editar" de um card
  const handleEditClick = (productToEdit: Product) => {
    setEditingProduct(productToEdit); // Define o produto a ser editado
    setShowForm(true); // Abre o formulário
  };

  // 👇 Função unificada para lidar com a submissão do formulário (Criar ou Editar)
  const handleFormSubmit = async (formData: ProductCreateData | ProductUpdateData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (editingProduct) {
        // --- Modo Edição ---
        const updatedProduct = await updateProductData(editingProduct.id, formData as ProductUpdateData);
        // Atualiza a lista localmente substituindo o produto antigo pelo novo
        setProducts(prevProducts =>
          prevProducts.map(p => p.id === editingProduct.id ? updatedProduct : p)
        );
         console.log('Produto atualizado com sucesso!');
      } else {
        // --- Modo Criação ---
        const newProduct = await addProduct(formData as ProductCreateData);
        // Atualiza a lista localmente adicionando o novo produto no início
        setProducts(prevProducts => [newProduct, ...prevProducts]);
         console.log('Produto adicionado com sucesso!');
      }
      closeForm(); // Fecha o formulário após sucesso
    } catch (err) {
       console.error("Erro ao salvar produto:", err);
       setSubmitError(err instanceof Error ? err.message : "Erro ao salvar produto.");
       // Mantém o formulário aberto para o usuário ver o erro
    } finally {
        setIsSubmitting(false);
    }
  };

  // 👇 Função para lidar com o clique no botão "Deletar" de um card
  const handleDeleteClick = async (productId: string) => {
    // Confirmação simples do navegador
    if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
        // Poderia adicionar um estado de loading específico para deleção se quisesse
        try {
            await removeProduct(productId);
            // Remove o produto da lista localmente após sucesso na API
            setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
             console.log(`Produto ${productId} deletado com sucesso!`);
        } catch (err) {
            console.error(`Erro ao deletar produto ${productId}:`, err);
            // Exibe um alerta ou mensagem de erro mais robusta
            alert(`Erro ao deletar produto: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
        }
    }
  };

  return (
    <main className="container mx-auto p-4 pt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Nossos Produtos - PetHonra</h1>
        {/* Botão para mostrar o formulário de adição */}
        <button
          onClick={handleShowAddForm} // Chama a função para abrir o form em modo ADD
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Adicionar Produto
        </button>
      </div>

      {/* Renderização condicional do Formulário (Modal ou Seção) */}
      {/* Aqui usamos uma renderização simples, idealmente seria um Modal */}
      {showForm && (
         <div className="mb-8 p-4 border rounded-lg bg-gray-50 shadow-md">
            {/* Passa os dados iniciais se estiver editando */}
            <ProductForm
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
                initialData={editingProduct} // Passa o produto para edição (ou null se adicionando)
                onCancel={closeForm} // Passa a função para fechar/cancelar
            />
            {submitError && <p className="text-red-500 mt-2 text-sm">{submitError}</p>}
         </div>
      )}


      {/* Seção da Lista de Produtos */}
      {isLoading && <p className="text-center text-gray-500">Carregando produtos...</p>}
      {error && <p className="text-center text-red-500">Erro ao carregar: {error}</p>}
      {!isLoading && !error && (
        <div>
          {products.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                // 👇 Passa as funções de callback para o card
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditClick} // Passa a função de edição
                  onDelete={handleDeleteClick} // Passa a função de deleção
                />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
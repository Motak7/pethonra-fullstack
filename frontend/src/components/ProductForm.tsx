// frontend/src/components/ProductForm.tsx
'use client'; // Este componente usa estado e manipuladores de evento

import React, { useState, useEffect, FormEvent } from 'react';
import { Product, ProductCreateData, ProductUpdateData } from '../services/api';

interface ProductFormProps {
  onSubmit: (data: ProductCreateData | ProductUpdateData) => Promise<void>; // Função para lidar com o envio
  initialData?: Product | null; // Dados iniciais para modo de edição
  isLoading?: boolean; // Para desabilitar o form durante o envio
  onCancel?: () => void; // Função para cancelar/fechar o formulário
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialData = null,
  isLoading = false,
  onCancel,
}) => {
  // Estados para cada campo do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>(''); // Usar string para facilitar input
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState<number | string>(''); // Usar string
  const [imageUrl, setImageUrl] = useState('');

  // Modo de edição (verifica se initialData foi fornecido)
  const isEditing = !!initialData;

  // Efeito para preencher o formulário se initialData mudar (modo de edição)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price); // Assumindo que price é number
      setSku(initialData.sku);
      setStock(initialData.stock);
      setImageUrl(initialData.imageUrl || '');
    } else {
      // Resetar se não houver dados iniciais (modo de criação)
      setName('');
      setDescription('');
      setPrice('');
      setSku('');
      setStock('');
      setImageUrl('');
    }
  }, [initialData]);

  // Manipulador de envio do formulário
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previne recarregamento da página

    // Validação simples (MELHORAR com Zod/Yup no futuro)
    const priceNum = parseFloat(String(price));
    const stockNum = parseInt(String(stock), 10);

    if (isNaN(priceNum) || priceNum < 0) {
        alert('Por favor, insira um preço válido.');
        return;
    }
     if (isNaN(stockNum) || stockNum < 0) {
        alert('Por favor, insira um valor de estoque válido.');
        return;
    }
     if (!name.trim() || !description.trim() || !sku.trim()) {
         alert('Nome, Descrição e SKU são obrigatórios.');
         return;
     }


    // Monta o objeto de dados para enviar
    const productData: ProductCreateData | ProductUpdateData = {
      name,
      description,
      price: priceNum,
      sku,
      stock: stockNum,
      imageUrl: imageUrl || undefined, // Envia undefined se vazio para não sobrescrever com string vazia
    };

    // Chama a função onSubmit passada pelo componente pai
    await onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </h2>

      {/* Campo Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Campo Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Campos Preço e Estoque (lado a lado) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01" // Permite centavos
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            step="1" // Apenas inteiros
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Campo SKU */}
       <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU (Código Único)</label>
        <input
          type="text"
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Campo Imagem URL */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem (Opcional)</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Produto')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
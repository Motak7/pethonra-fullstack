// frontend/src/components/ProductCard.tsx
'use client'; // Componente de Cliente devido aos handlers onClick

import React from 'react';
import Image from 'next/image';
import { Product } from '../services/api'; // Importa a interface Product

// 👇 Interface de Props ATUALIZADA para incluir onEdit e onDelete
interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void; // Função chamada ao clicar em Editar
  onDelete: (productId: string) => void; // Função chamada ao clicar em Deletar
}

// 👇 Destrutura as novas props onEdit e onDelete
const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  // Formata o preço
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Handler para o botão Deletar que chama a prop onDelete
  const handleDeleteClick = () => {
    // A confirmação será feita no componente pai (page.tsx)
    onDelete(product.id);
  };

  // Handler para o botão Editar que chama a prop onEdit
  const handleEditClick = () => {
    // Passa o objeto product completo para o handler da página
    onEdit(product);
  };


  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      {/* Imagem do Produto */}
      {product.imageUrl ? (
        <div className="w-full h-48 relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw" // Exemplo de sizes mais refinado
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sem imagem
        </div>
      )}

      {/* Informações do Produto */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2 truncate" title={product.name}>
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mb-3 flex-grow">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <div className="mt-auto"> {/* Garante que preço/estoque/botões fiquem no final */}
          <p className="text-xl font-bold text-blue-700 mb-2">
            {formattedPrice}
          </p>
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
          </p>

          {/* --- Botões de Ação --- 👇 ATUALIZADO AQUI 👇 --- */}
          <div className="mt-4 pt-2 border-t flex justify-end space-x-2 items-center">
             {/* Botão Editar */}
             <button
               onClick={handleEditClick} // Chama o handler local que chama a prop onEdit
               className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline px-2 py-1"
               aria-label={`Editar ${product.name}`}
             >
               Editar
             </button>
             {/* Botão Deletar */}
             <button
               onClick={handleDeleteClick} // Chama o handler local que chama a prop onDelete
               className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline px-2 py-1"
               aria-label={`Deletar ${product.name}`}
             >
               Deletar
             </button>
             {/* Botão Adicionar ao Carrinho (placeholder) */}
             {/* <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors disabled:opacity-50" disabled={product.stock <= 0}>
               Comprar
             </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
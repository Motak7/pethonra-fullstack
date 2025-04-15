// frontend/src/components/ProductCard.tsx
import React from 'react';
import Image from 'next/image'; // Usar o componente Image do Next.js para otimização
import { Product } from '../services/api'; // Importa a interface Product

// Define as props que o componente receberá
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Formata o preço para o formato brasileiro
  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      {/* Imagem do Produto - CORRIGIDO */}
      {product.imageUrl ? (
        // O container pai PRECISA ter position relative para 'fill' funcionar
        <div className="w-full h-48 relative overflow-hidden"> {/* Adicionado relative e overflow-hidden */}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill // Usa a prop 'fill' em vez de 'layout'
            className="object-cover" // Usa classe Tailwind em vez da prop 'objectFit'
            priority={false}
            // sizes é recomendado ao usar fill para otimização, mas opcional para começar
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        // Placeholder (mantido igual)
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Sem imagem
        </div>
      )}

      {/* Informações do Produto (mantido igual) */}
      <div className="p-4 flex flex-col flex-grow">
        {/* ... (resto do código do card - name, description, price, etc) ... */}
           <h2 className="text-lg font-semibold mb-2 truncate" title={product.name}>
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm mb-3 flex-grow">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <div className="mt-auto">
              <p className="text-xl font-bold text-blue-700 mb-2">
                {/* {formattedPrice} */} {/* Comentado temporariamente caso price não seja number */}
                R$ {product.price} {/* Exibindo direto por enquanto */}
              </p>
              <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} em estoque` : 'Indisponível'}
              </p>
              <div className="mt-4 flex justify-between items-center">
                {/* Placeholder para botões */}
              </div>
            </div>
      </div>
    </div>
  );
};

export default ProductCard;
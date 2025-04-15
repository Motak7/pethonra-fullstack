// frontend/next.config.ts
import type { NextConfig } from 'next'; // Importa o tipo para type checking

const nextConfig: NextConfig = {
  // Mantenha aqui qualquer configuração que já exista no seu arquivo
  // Exemplo comum: reactStrictMode: true,
  reactStrictMode: true, // Garanta que esta linha (ou outras configs) permaneça se já existir

  // Adicione ou modifique a configuração 'images'
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Protocolo da URL da imagem
        hostname: 'via.placeholder.com', // O domínio a permitir
        port: '', // Vazio para portas padrão
        pathname: '/**', // Permite qualquer caminho neste host
      },
      // Adicione outros hosts aqui se precisar no futuro
      // { protocol: 'https', hostname: 'cdn.exemplo.com' },
    ],
  },
};

export default nextConfig; // Exporta a configuração atualizada
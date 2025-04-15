// backend/src/server.ts

// Importa os módulos necessários
import express, { Request, Response } from 'express'; // Framework web
import cors from 'cors'; // Middleware para habilitar CORS
import dotenv from 'dotenv'; // Para carregar variáveis de ambiente do .env
import productRoutes from './routes/productRoutes'; // <-- OK: Importa o router de PRODUTO

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();

// Aplica os middlewares
app.use(cors()); // Habilita o CORS para todas as origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Define a porta a partir das variáveis de ambiente ou usa 3333 como padrão
const PORT = process.env.PORT || 3333;

// --- Rotas ---
// Rota básica de Health Check (Mantida)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running!',
    timestamp: new Date().toISOString(),
  });
});

// Monta as rotas relacionadas a Produtos sob o prefixo /api/products
// 👇 *** LINHA CORRIGIDA *** 👇
app.use('/api/products', productRoutes);

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  // Obtém a data e hora atual formatada para o fuso horário de São Paulo
  const startTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  console.log(`------------------------------------------------------`);
  console.log(`🚀 Backend server started successfully!`);
  console.log(`✅ Listening on port: ${PORT}`);
  console.log(`🕒 Start time (São Paulo): ${startTime}`);
  console.log(`🔗 Health check available at: http://localhost:${PORT}/`);
  // 👇 *** LINHA DE LOG CORRIGIDA *** 👇
  console.log(`🛍️ Product routes available at: http://localhost:${PORT}/api/products`);
  console.log(`------------------------------------------------------`);
});

// Exporta o app (útil para testes ou outras integrações, opcional para este início)
// export default app;
// Importa os módulos necessários
import express, { Request, Response } from 'express'; // Framework web
import cors from 'cors'; // Middleware para habilitar CORS
import dotenv from 'dotenv'; // Para carregar variáveis de ambiente do .env
import petRoutes from './routes/petRoutes'; // Importa o router de pets

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();

// Aplica os middlewares
app.use(cors()); // Habilita o CORS para todas as origens (ajuste conforme necessário para produção)
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Define a porta a partir das variáveis de ambiente ou usa 3333 como padrão
const PORT = process.env.PORT || 3333;

// --- Rotas ---
// Rota básica de Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Backend is running!',
    timestamp: new Date().toISOString(), // Adiciona um timestamp para verificar se está atualizado
  });
});

// Monta as rotas relacionadas a Pets sob o prefixo /api/pets
app.use('/api/pets', petRoutes);

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
  // Adicionando a nova rota ao log para fácil acesso:
  console.log(`🐾 Pet routes available at: http://localhost:${PORT}/api/pets`);
  console.log(`------------------------------------------------------`);
  // Data atual fornecida pelo sistema (para referência): April 10, 2025 at 12:13:45 AM -03
});

// Exporta o app (útil para testes ou outras integrações, opcional para este início)
// export default app;

import { PrismaClient } from '../generated/prisma'; // Ajuste o caminho se necessário

/*
 * Importa o PrismaClient da localização onde ele foi gerado.
 * Baseado no seu schema.prisma (`generator client { output = "../src/generated/prisma" }`),
 * o cliente é gerado em `backend/src/generated/prisma`.
 * O caminho '../generated/prisma' é relativo a este arquivo (`backend/src/config/database.ts`).
 */

// Cria uma única instância do PrismaClient
const prisma = new PrismaClient({
    // Você pode adicionar opções de configuração aqui se necessário,
    // como logs:
    // log: ['query', 'info', 'warn', 'error'],
});

// Exporta a instância para ser usada em outras partes da aplicação
export default prisma;

/*
 * Boa prática: Garantir uma única instância do PrismaClient (Singleton).
 * Este módulo, ao ser importado, sempre fornecerá a mesma instância 'prisma'.
 * Evita criar múltiplas conexões/pools desnecessariamente.
 */

// Opcional: Código para desconectar apropriadamente ao Sair (mais relevante para scripts)
// async function connectPrisma() {
//   try {
//     await prisma.$connect();
//     console.log('🍃 Prisma Client Connected');
//   } catch (error) {
//     console.error('❌ Prisma Client Connection Error:', error);
//     process.exit(1);
//   }
// }

// async function disconnectPrisma() {
//   await prisma.$disconnect();
//   console.log('🍂 Prisma Client Disconnected');
// }

// Você pode querer chamar connectPrisma() em algum ponto inicial,
// e registrar disconnectPrisma() para eventos de encerramento (SIGINT, SIGTERM).
// Para uma API web simples, o Prisma geralmente gerencia conexões sob demanda.

// connectPrisma(); // Exemplo de chamada inicial (opcional aqui)
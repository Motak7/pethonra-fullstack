// backend/eslint.config.js
import js from "@eslint/js"; // Regras base recomendadas do ESLint
import tseslint from "typescript-eslint"; // Integração TypeScript (parser, plugin, regras)
import eslintConfigPrettier from "eslint-config-prettier"; // Desativa regras de estilo conflitantes com Prettier
import globals from "globals"; // Define ambientes globais (Node, browser, etc.)

export default tseslint.config( // Helper do typescript-eslint para construir a config
  // Configurações Globais (aplicadas a todos os arquivos por padrão)
  {
    // Define arquivos a serem ignorados globalmente
    ignores: [
      "node_modules/",
      "dist/",
      "src/generated/", // Pasta gerada pelo Prisma
      ".env",
      ".env.*",
      "prisma/migrations/",
      "eslint.config.js", // Ignora o próprio arquivo de config
    ],
  },

  // Configuração base recomendada do ESLint
  js.configs.recommended,

  // Configurações recomendadas do TypeScript-ESLint
  // Substitui o antigo `extends: ['plugin:@typescript-eslint/recommended']`
  ...tseslint.configs.recommended,

  // Configuração específica para arquivos TypeScript no projeto
  {
    files: ["src/**/*.ts"], // Aplica somente a arquivos .ts dentro de src/
    languageOptions: {
      globals: {
        ...globals.node, // Adiciona variáveis globais do ambiente Node.js
      },
    },
    rules: {
      // Suas regras personalizadas ou overrides aqui
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Avisa sobre vars não usadas, mas ignora se começar com _
      // Ex: 'no-console': 'warn',
    },
  },

  // Configuração do Prettier (DEVE SER A ÚLTIMA para desativar regras)
  eslintConfigPrettier
);
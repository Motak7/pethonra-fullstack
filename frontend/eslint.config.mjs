// frontend/eslint.config.mjs

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier"; // 1. Importe o eslint-config-prettier

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define a configuração do ESLint como um array
const eslintConfig = [
  // Mantém as configurações base do Next.js que você já tinha
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ... outras configurações personalizadas que você possa ter adicionado ...

  // 2. Adicione eslintConfigPrettier ao FINAL do array.
  // Isso garante que ele sobrescreva/desative regras conflitantes das configs anteriores.
  eslintConfigPrettier,
];

export default eslintConfig; // Exporta o array de configurações atualizado
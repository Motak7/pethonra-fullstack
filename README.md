# PetHonra - Full-Stack 🐾 (WIP)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
> [!NOTE]
> PetHonra é um desenvolvimento de uma plataforma de e-commerce full-stack, utilizando tecnologias modernas (Node.js, Next.js, Prisma, PostgreSQL), para servir como canal de vendas online exclusivo da marca Pet Honra. O foco está em performance, experiência do usuário e escalabilidade para suportar o catálogo de produtos e base de clientes da marca. Status: Em Desenvolvimento (WIP). 

## ✨ Features

* Cadastro e gerenciamento de perfis de Pets (API e UI inicial).
* API RESTful construída com Node.js, Express e TypeScript.
* Banco de dados PostgreSQL gerenciado via Prisma ORM.
* Frontend reativo com Next.js (App Router) e Tailwind CSS.
* Configuração de ambiente separada para backend e frontend.
* [Planejado] Autenticação de usuários (JWT ou similar).
* [Planejado] Agendamento de consultas/serviços.
* [Planejado] Funcionalidades X, Y, Z.

## 🚀 Getting Started

Siga estas instruções para configurar e rodar o projeto localmente para desenvolvimento e teste.

### Pré-requisitos

* **Node.js:** Versão 18 ou superior recomendada. ([Download](https://nodejs.org/))
* **npm:** (Vem com o Node.js) ou pnpm / yarn.
* **Git:** Essencial para clonar o repositório. ([Download](https://git-scm.com/))
* **Conta Supabase:** Necessária para obter a string de conexão do banco de dados PostgreSQL. ([Supabase](https://supabase.com/))

### Instalação e Configuração

1.  **Clone o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_NO_GITHUB]
    cd pethonra-fullstack
    ```
    *(Substitua `[URL_DO_SEU_REPOSITORIO_NO_GITHUB]` pela URL real)*

2.  **Configure o Backend:**
    * Navegue até a pasta `backend`:
        ```bash
        cd backend
        ```
    * **Crie o arquivo `.env.example`** (se ainda não existir) com o seguinte conteúdo:
        ```dotenv
        # backend/.env.example
        DATABASE_URL=" coloque_sua_string_de_conexão_aqui "
        PORT=3333
        ```
    * Copie o arquivo de exemplo para criar seu arquivo de ambiente local:
        ```bash
        cp .env.example .env
        ```
    * **Edite o arquivo `.env`** e substitua o valor de `DATABASE_URL` pela sua string de conexão real do Supabase. Mantenha a `PORT` ou altere se necessário.
    * Instale as dependências do backend:
        ```bash
        npm install
        ```
    * Execute as migrações do Prisma para criar as tabelas no banco:
        ```bash
        npx prisma migrate dev
        ```

3.  **Configure o Frontend:**
    * Navegue até a pasta `frontend` (a partir da raiz do projeto):
        ```bash
        cd ../frontend
        # ou 'cd frontend' se você estiver na raiz
        ```
    * **Crie o arquivo `.env.local.example`** (se ainda não existir) com o seguinte conteúdo:
        ```dotenv
        # frontend/.env.local.example
        NEXT_PUBLIC_API_URL=http://localhost:3333/api
        ```
    * Copie o arquivo de exemplo para criar seu arquivo de ambiente local:
        ```bash
        cp .env.local.example .env.local
        ```
    * **Edite o arquivo `.env.local`** (normalmente o valor padrão já funciona para desenvolvimento local, mas verifique se a porta do backend (`3333`) está correta).
    * Instale as dependências do frontend:
        ```bash
        npm install
        ```

## ⚙️ Rodando a Aplicação

É necessário ter **dois terminais** abertos para rodar o backend e o frontend simultaneamente.

1.  **Iniciar o Servidor Backend:**
    * No Terminal 1, navegue até a pasta `backend/`:
        ```bash
        cd backend
        npm run dev
        ```
    * O backend estará rodando em `http://localhost:3333` (ou a porta configurada).

2.  **Iniciar o Servidor Frontend:**
    * No Terminal 2, navegue até a pasta `frontend/`:
        ```bash
        cd frontend
        npm run dev
        ```
    * A aplicação frontend estará acessível em `http://localhost:3000`.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Cors, Dotenv
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Fetch API
* **Banco de Dados:** Supabase (Cloud PostgreSQL)
* **Dev Tools:** ESLint, Prettier, ts-node-dev (ou tsx), Git

## 🧪 Rodando Testes (WIP)

*(Seção a ser preenchida quando os testes forem implementados)*

Atualmente, não há testes automatizados configurados. A configuração futura pode incluir:

```bash
# Exemplo: Rodar testes do backend
cd backend
npm test # (script a ser configurado com Jest/Vitest)

# Exemplo: Rodar testes do frontend
cd frontend
npm test # (script a ser configurado com Jest/Vitest/RTL)
# npm run test:e2e # (script a ser configurado com Cypress/Playwright)

## 🌳 Estratégia de Branching

Este projeto utiliza o fluxo **GitHub Flow** simplificado:

1.  A branch `main` é a fonte da verdade e deve sempre conter código estável.
2.  Para novas funcionalidades ou correções, crie uma branch a partir da `main` (ex: `feat/nome-da-feature`, `fix/corrige-bug`).
3.  Faça commits na sua branch de feature/fix.
4.  Abra um Pull Request (PR) no GitHub comparando sua branch com a `main`.
5.  Após revisão e aprovação (e passagem em testes/CI, quando configurado), faça o merge do PR na `main`.

## 🤝 Contribuição

Agradecemos o seu interesse em contribuir com o PetHonra! Embora atualmente seja um projeto em desenvolvimento ativo, futuras contribuições são bem-vindas. Por favor, siga estas diretrizes:

### Reportando Bugs e Sugerindo Features
* Utilize a seção **Issues** deste repositório no GitHub para reportar qualquer bug encontrado ou para sugerir novas funcionalidades.
* Por favor, forneça o máximo de detalhes possível: descreva o problema, passos para reproduzi-lo (para bugs), e a justificativa da sua sugestão (para features).

### Contribuindo com Código
1.  **Discuta:** Antes de começar a trabalhar em uma mudança significativa (como uma nova feature ou refatoração grande), é recomendado abrir uma Issue para discutir a ideia primeiro.
2.  **Fork (se externo):** Se você não é um colaborador direto, faça um fork do repositório para sua conta GitHub.
3.  **Branch:** Crie uma nova branch descritiva a partir da `main` para sua feature ou correção (seguindo a Estratégia de Branching abaixo, ex: `git checkout -b feat/nome-da-feature`).
4.  **Desenvolva:** Faça suas alterações no código.
    * Mantenha o estilo de código existente. Use os comandos de lint e formatação (quando configurados): `npm run lint` e `npm run format` nas pastas `frontend` e `backend`.
    * Adicione testes para suas mudanças, se aplicável (quando a estrutura de testes estiver pronta).
5.  **Commits:** Faça commits claros e atômicos. Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/) para as mensagens (ex: `feat: Add user login functionality`).
6.  **Pull Request:** Envie um Pull Request (PR) da sua branch para a branch `main` do repositório original (`SeuUsuario/pethonra-fullstack`).
    * Descreva suas mudanças claramente no PR, explicando o quê e porquê. Se o PR resolve uma Issue existente, mencione-a (ex: `Closes #123`).
7.  **Revisão:** Seu PR será revisado. Feedback pode ser fornecido e ajustes podem ser solicitados antes do merge ser aprovado e realizado.

Obrigado por ajudar a tornar o PetHonra melhor!


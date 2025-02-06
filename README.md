# Frontend para Consumo de API em Java

Este projeto é uma aplicação frontend desenvolvida em Vue 3 utilizando a Composition API, TypeScript e Tailwind CSS. A aplicação foi criada para consumir uma API desenvolvida em Java e possui quatro telas principais.

## 📌 Tecnologias Utilizadas

- **Vue 3** com **Composition API**
- **TypeScript**
- **Tailwind CSS**
- **Axios** para requisições HTTP
- **Vue Router** para gerenciamento de rotas

## 📌 Funcionalidades

A aplicação possui quatro telas principais:

1. **Login**: Permite o usuario acessar a lista de subestações.
2. **Listagem de Subestações**: Exibe uma lista de subestações cadastradas.
3. **Inclusão de Subestação e Redes MT**: Formulário para adicionar novas subestações e redes MT.
4. **Visualização da Localização da Subestação**: Exibe a localização da subestação utilizando um **iframe**, pois a funcionalidade é apenas para visualização.

## 🚀 Instalação e Execução

### Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** (versão 16 ou superior)
- **NPM** ou **Yarn**

### Passos para executar o projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Configuração da API
Certifique-se de configurar a URL da API corretamente no projeto. Você pode definir a variável de ambiente no arquivo `.env`:

```env
VITE_API_URL=http://seu-servidor-api.com
```

E utilizar essa configuração nos serviços de requisição:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;
```

## 📜 Estrutura do Projeto
```
📂 src
 ├── 📂 assets       # Arquivos estáticos
 ├── 📂 components   # Componentes reutilizáveis
 ├── 📂 views        # Páginas da aplicação
 ├── 📂 router       # Configuração das rotas
 ├── 📂 services     # Serviços para consumo da API
 ├── 📂 store        # Gerenciamento de estado (caso necessário)
 ├── App.vue        # Componente principal
 ├── main.ts        # Ponto de entrada do Vue
 └── vite.config.ts  # Configuração do Vite
```
## 📄 Licença
Este projeto está sob a licença MIT.


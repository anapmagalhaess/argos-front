<!-- README preparado a partir dos requisitos da Global Solution 2026/2 e das informações do projeto Argos. -->

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=2E5A43&height=180&section=header&text=ARGOS&fontSize=64&fontColor=E6DAC6&fontAlignY=38&desc=De%20olho%20na%20sua%20ro%C3%A7a&descAlignY=62&descSize=20" width="100%" alt="Argos — De olho na sua roça" />

# 🌱 Argos

### Avisos de clima e pragas em linguagem simples para quem planta.

**Projeto acadêmico da Global Solution 2026/2 — CitizenTech · FIAP**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://argos-front-six.vercel.app/)

🌐 **[Abrir aplicação](https://argos-front-six.vercel.app/)** · 💻 **[Repositório GitHub](https://github.com/anapmagalhaess/argos-front)** · ⚙️ **[API Java](https://argos-api-java.onrender.com)**

</div>

---

## 🌎 Sobre o projeto

O **Argos** é uma proposta de copiloto digital para pequenos produtores rurais. O projeto reúne informações de clima, lavouras e pragas em uma interface visual, com linguagem direta e recursos pensados para facilitar a consulta no campo.

A aplicação permite conhecer a solução, consultar um mapa de culturas, explorar um guia visual de pragas, cadastrar produtor e propriedade e acompanhar os dados da roça na área **Hoje**. O front-end integra-se à API REST Java do projeto para consultar e registrar dados.

> 🌾 **Proposta:** aproximar informação útil sobre a lavoura de quem precisa tomar decisões no campo.

## ✨ O que você encontra

| 🗺️ Mapa e lavouras | 🌦️ Condições | 🐛 Guia visual | 👩‍🌾 Cadastro e painel |
| :--- | :--- | :--- | :--- |
| Mapa interativo e culturas disponíveis no projeto. | Consulta de clima e condições por localidade, com estados de carregamento e erro. | Catálogo visual para explorar pragas e culturas relacionadas. | Cadastro de produtor, propriedade e plantio; consulta dos dados no painel Hoje. |

A interface também inclui navegação responsiva, estados vazios e mensagens de retorno, componentes reutilizáveis e um controle de leitura em voz alta.

## 🧭 Páginas e rotas

| Página | Rota | Descrição |
| :--- | :--- | :--- |
| Início | `/` | Apresentação do Argos e acesso às áreas do projeto. |
| Integrantes | `/integrantes` | Equipe e divisão de responsabilidades. |
| Sobre | `/sobre` | Contexto do problema e proposta. |
| Solução | `/solucao` | Detalhamento da solução e simulação de cenários. |
| FAQ | `/faq` | Perguntas e respostas sobre o projeto. |
| Contato | `/contato` | Canais apresentados pela equipe. |
| Cadastro / triagem | `/cadastro`, `/triagem` | Cadastro em etapas de produtor, propriedade e plantio. |
| Entrar | `/entrar` | Localização do cadastro por telefone. |
| Hoje | `/hoje` | Painel da roça, plantios e informações disponíveis. |
| Conta | `/conta` | Dados de conta e opções da sessão. |
| Mapa | `/mapa` | Mapa de culturas e catálogo de pragas. |
| Guia de cultura | `/guia/:cultura` | Guia dinâmico por cultura; exemplo: `/guia/milho`. |

## 🛠️ Tecnologias

- **React** para a interface baseada em componentes.
- **Vite** para desenvolvimento local e geração da versão de produção.
- **TypeScript** para tipagem de páginas, componentes, serviços e dados.
- **Tailwind CSS** para estilos e adaptação de layout.
- **React Router** para navegação SPA e rotas com parâmetro.
- **Fetch API** para comunicação HTTP, sem Axios.
- **MapLibre GL** para a experiência cartográfica.
- **Font Awesome** para ícones.

## 🔌 Integrações

### API REST Java

A aplicação consome a API Java do Argos, publicada no Render. O endereço padrão é `https://argos-api-java.onrender.com`; ele pode ser substituído localmente pela variável `VITE_API_URL`.

| Fluxo no front-end | Operações principais |
| :--- | :--- |
| Cadastro / triagem | `POST /produtores`, `POST /produtores/{id}/propriedades`, `POST /propriedades/{id}/plantios` |
| Entrar | Consultas de produtores e propriedades |
| Hoje | Consulta de plantios e dados associados |
| Conta | Consulta de produtor; edição dos dados suportados pela API |

As chamadas estão organizadas em serviços e usam tipos TypeScript. A interface trata carregamento, erros de comunicação, validações e listas sem resultados.

### Serviços complementares

O front também consulta a **Open-Meteo** para informações meteorológicas e de qualidade do ar. Essa integração complementa os recursos do mapa e do painel; ela não substitui a API Java exigida para os dados do domínio Argos.

## 🗂️ Estrutura do projeto

```text
argos-front/
├── public/                 # Ícones, imagens, fotos e recursos estáticos
├── src/
│   ├── components/         # Componentes reutilizáveis da interface
│   ├── contexto/           # Provedor e estado de conta
│   ├── data/               # Dados de referência usados pela interface
│   ├── hooks/              # Hooks de busca, leitura e navegação
│   ├── pages/              # Páginas da aplicação
│   ├── routes/             # Definição das rotas SPA
│   ├── services/           # Comunicação com APIs
│   ├── types/              # Tipos e interfaces TypeScript
│   └── utils/              # Funções auxiliares
├── index.html
├── package.json
├── vercel.json             # Reescrita de rotas para a SPA
└── vite.config.ts
```

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js compatível com a versão atual do Vite.
- npm.

### Instalação

```bash
git clone https://github.com/anapmagalhaess/argos-front.git
cd argos-front
npm install
npm run dev
```

Abra o endereço local informado pelo Vite, normalmente **http://localhost:5173**.

### Configurar a API

O front já usa a API remota por padrão. Para apontar a aplicação a uma API local, crie `.env.local` na raiz:

```env
VITE_API_URL=http://localhost:8080
```

Variáveis disponíveis no arquivo de exemplo:

```env
VITE_API_URL=https://argos-api-java.onrender.com
VITE_ML_API_URL=https://argos-ia-api.onrender.com
```

### Scripts

| Comando | Ação |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos TypeScript e gera a build de produção. |
| `npm run preview` | Serve localmente a build gerada. |
| `npm run lint` | Executa o Oxlint. |

## 🔗 Links do projeto e APIs

- 🌐 **Aplicação na Vercel:** [https://argos-front-six.vercel.app/](https://argos-front-six.vercel.app/)
- 🎥 **Vídeo de apresentação:** [Assistir no YouTube](https://youtu.be/RUNfwP-DgnU) 
- 💻 **Repositório GitHub:** [argos-front](https://github.com/anapmagalhaess/argos-front)

### APIs utilizadas

- ☕ **API REST Java do Argos:** [https://argos-api-java.onrender.com](https://argos-api-java.onrender.com) — cadastro e consulta de produtores, propriedades, plantios e alertas.
- 🤖 **API de IA do Argos:** [https://argos-ia-api.onrender.com](https://argos-ia-api.onrender.com) — previsões de produtividade e risco de quebra.
- 🌦️ **Open-Meteo Forecast API:** [Documentação](https://open-meteo.com/en/docs) · endpoint usado: `https://api.open-meteo.com/v1/forecast`.
- 🌬️ **Open-Meteo Air Quality API:** [Documentação](https://open-meteo.com/en/docs/air-quality-api) · endpoint usado: `https://air-quality-api.open-meteo.com/v1/air-quality`.

Para as rotas SPA funcionarem no deploy, a Vercel encaminha as requisições para `index.html`, conforme `vercel.json`. No ambiente remoto, a URL pública do front também precisa estar autorizada na configuração de CORS da API Java.
## 📱 Responsividade e acessibilidade

O layout utiliza utilitários responsivos do Tailwind e deve ser conferido nos tamanhos de tela definidos na entrega:

| Cenário de avaliação | Resolução |
| :--- | :---: |
| 📱 Mobile | 390 × 844 px |
| 📲 Tablet | 768 × 1024 px |
| 🖥️ Desktop | 1440 × 900 px |

A revisão deve verificar rolagem horizontal indevida, cortes, sobreposições, navegação por teclado, foco visível e legibilidade. O projeto inclui atributos ARIA, mensagens acessíveis de estado e um controle de leitura em voz alta.

## 👥 Equipe

| Integrante | RM | Turma | Responsabilidade | GitHub | LinkedIn |
| :--- | :---: | :---: | :--- | :--- | :--- |
| Ana Clara Pereira de Magalhães | 560871 | 1TDSPF | Front-End | [anapmagalhaess](https://github.com/anapmagalhaess) | [LinkedIn](https://www.linkedin.com/in/anaclmagalhaes/) |
| Diogo Guilherme de Assis Reis | 573301 | 1TDSPF | API em Java | [DioohReis](https://github.com/DioohReis) | [LinkedIn](https://www.linkedin.com/in/diogoareis/) |
| Gabriel Razo Dantas | 572244 | 1TDSPF | Engenharia de Software | [gabrielrazod9j-ops](https://github.com/gabrielrazod9j-ops) | [LinkedIn](https://www.linkedin.com/in/gabriel-razo-dantas-34724b301/) |
| Gabriel Ricardo Gomes Lima | 572279 | 1TDSPY | Dados e IA | [gabriel-ricardo-20](https://github.com/gabriel-ricardo-20) | [LinkedIn](https://www.linkedin.com/in/gabriel-ricardo-lima/) |
| Pedro Henrique de Lima Reis | 569178 | 1TDSPF | Python | [pedrolimeisdev](https://github.com/pedrolimeisdev) | [LinkedIn](https://www.linkedin.com/in/pedrolimeis/) |

## 📬 Contato e suporte

Para dúvidas ou problemas técnicos, use as [issues do repositório](https://github.com/anapmagalhaess/argos-front/issues).

---

<div align="center">

🌱 **Argos — informação clara para acompanhar a sua roça.**

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=2E5A43&height=130&section=footer" width="100%" alt="Rodapé Argos" />

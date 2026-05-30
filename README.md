<video src="public/media/home-page-video.webm" autoplay loop muted width="100%"></video>

# Escape From Giddy

## Sumário

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
  - [Mecânica do Jogo (Canvas API)](#mecânica-do-jogo-canvas-api)
  - [API REST](#api-rest)
  - [Frontend](#frontend)
- [Stack Tecnológica](#stack-tecnológica)
- [Como Executar Localmente](#como-executar-localmente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Possíveis Aprimoramentos](#possíveis-aprimoramentos)
- [Licença](#licença)

## Sobre

Projeto full-stack de um jogo 2D de perseguição em tempo real, desenvolvido como prática de desenvolvimento web com JavaScript, Canvas API e banco de dados relacional. Combina uma API REST construída com Node.js e Express a um frontend que renderiza o jogo via Canvas API, consumindo dados persistentes em MySQL.

Disponível em: [escapefromgiddy.alwaysdata.net](https://escapefromgiddy.alwaysdata.net)

---

## Funcionalidades

### Mecânica do Jogo (Canvas API)

- Renderização 2D baseada em sprites (PNG) em loop de animação com `requestAnimationFrame`
- Controles WASD com tratamento de movimento diagonal via decomposição vetorial (fator 0.7)
- Personagem inimigo controlado por IA que persegue o jogador com base na diferença de coordenadas
- Detecção de colisão entre entidades via AABB (Axis-Aligned Bounding Box)
- Colisão com os limites do canvas (viewport adaptável ao tamanho da janela)
- Modo **Rage** — o inimigo Giddy acelera em 30% após 70% do tempo de jogo
- Limite de 90 segundos: sobreviva para vencer; ser capturado resulta em game over
- Sistema de pontuação baseado no tempo de sobrevivência, com persistência de recordes

### API REST

- Servidor Express com rotas modularizadas
- Conexão MySQL via pool de conexões (`mysql2/promise`)
- Queries parametrizadas para segurança no acesso aos dados
- Endpoints:

| Método | Rota                    | Descrição                                   |
|--------|-------------------------|---------------------------------------------|
| GET    | `/`                     | Página inicial                              |
| GET    | `/game`                 | Tela do jogo                                |
| GET    | `/ranking`              | Tabela de classificação                     |
| GET    | `/rank`                 | Ranking em JSON (ordenado por pontuação)    |
| GET    | `/rank/:nomeJogador`    | Recorde individual (cria se inexistente)    |
| PATCH  | `/rank`                 | Atualizar recorde (com validação)           |

- Middleware de validação de corpo de requisição, nome de jogador e tipo do valor do recorde

### Frontend

- Três páginas HTML servidas estaticamente: Home, Game e Ranking
- Pop-ups modais para entrada de nome e exibição de resultados, utilizando `<template>` e `importNode`
- Estilização com CSS modules e Google Fonts (Jersey 10, Sedgwick Ave Display)
- Comunicação com a API via Fetch API
- Armazenamento local com `localStorage` para persistência de nome de jogador e recorde

---

## Stack Tecnológica

| Camada     | Tecnologia                                     |
|------------|------------------------------------------------|
| Runtime    | Node.js                                        |
| Framework  | Express 5                                      |
| Banco      | MySQL 8+ (driver `mysql2`)                     |
| Frontend   | HTML5, CSS3, JavaScript (ES Modules)           |
| Gráficos   | Canvas API (`CanvasRenderingContext2D`)        |
| Qualidade  | ESLint, Prettier                               |

---

## Como Executar Localmente

Pré-requisitos: Node.js 18+ e MySQL 8+

```bash
git clone <url>
cd escape_from_diddy
cp .env.example .env
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=8080
IP=localhost
NODE_ENV=development
MYSQL_USER=usuario
MYSQL_PASSW=senha
DATABASE=escape_from_diddy
MYSQL_HOST=localhost
```

Em seguida:

```bash
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:8080`.

---

## Estrutura do Projeto

```
├── server.js                 # Inicialização do servidor Express
├── routes.js                 # Definição de rotas
├── database.js               # Pool de conexão MySQL
├── src/
│   ├── controllers/          # Lógica dos endpoints
│   │   ├── rankControllers.js
│   │   └── staticPagesControllers.js
│   ├── middlewares/          # Validação de requisição
│   │   └── validacaoCorpoRequisicao.js
│   └── libs/                 # Utilitários
│       ├── HttpStatus.js     # Constantes de status HTTP
│       └── getPage.js        # Resolução de caminho de páginas
├── public/
│   ├── pages/                # home.html, game.html, rank.html
│   ├── scripts/              # Módulos JavaScript
│   │   ├── game/             # Lógica do jogo (Person, colisão, recorde)
│   │   ├── home/             # Inicialização, pop-up, validação
│   │   └── rank/             # Consumo da API de ranking
│   ├── styles/               # CSS por página
│   └── media/                # Sprites, backgrounds, vídeo
└── .env.example              # Template de variáveis de ambiente
```

---

## Possíveis Aprimoramentos

- Sistema de power-ups e itens coletáveis no canvas
- Obstáculos e barreiras no cenário para enriquecer a movimentação
- Múltiplas fases com dificuldade progressiva e diferentes inimigos
- Efeitos sonoros e trilha sonora (Web Audio API)
- Suporte a controles táteis em dispositivos móveis (touch events)
- Diferentes personagens selecionáveis pelo jogador
- Sistema de conquistas (_achievements_)
- Internacionalização (i18n) para outros idiomas
- Empacotamento e otimização com Vite para produção

---

## Licença

ISC

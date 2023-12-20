# Documentação do Aplicativo React de Pedidos - Agil Fast Food

## Introdução
O "Agil Fast Food" é um sistema de pedidos onde os usuários podem adicionar lanches no carrinho, fazer pedidos, se registrar e fazer login. Os usuários com privilégios de administrador podem adicionar mais pedidos. Além disso, os usuários podem visualizar seu histórico de pedidos.

## Clonando o Projeto

1. Abra o terminal no diretório onde deseja clonar o projeto.
2. Execute o comando `git clone https://github.com/JoaoVitorAguiar/AgilFastfoodFrontEnd`

## Configuração do Ambiente

1. Navegue até o diretório do projeto com `cd AgilFastfoodFrontEnd` .
2. Execute `yarn` para instalar todas as dependências do projeto listadas no arquivo `package.json`.
3. Inicie o servidor de desenvolvimento com `npm run dev`. Seu aplicativo agora deve estar rodando em `http://localhost:3000`.
4. Inicie o aplicativo com `yarn start`

## API Consumida

A Api consumida pode ser encontrada em: https://github.com/JoaoVitorAguiar/AgilFastfoodBackEnd

## Estrutura do Projeto
O projeto é estruturado da seguinte forma:
- `index.js`: Este é o ponto de entrada do aplicativo. Ele envolve o componente App com os provedores de contexto do usuário e do carrinho.
- `App.js`: Este é o componente principal do aplicativo. Ele define as rotas do aplicativo e renderiza os componentes correspondentes.
- `UserContext.js`: Este arquivo define o contexto do usuário e fornece funções para atualizar o estado do usuário.
- `CartContext.js`: Este arquivo define o contexto do carrinho e fornece funções para manipular o carrinho de compras.
- `httpService.ts`: Este arquivo define um serviço HTTP para fazer requisições à API. Ele inclui um interceptor que adiciona um token de autenticação ao cabeçalho de cada requisição.
- `authService.ts`: Este arquivo define funções para autenticação e registro de usuários. Ele também inclui funções para obter o usuário atual e verificar se o usuário está autenticado.

## Conexão com a API
Detalhes sobre como o aplicativo se conecta à API. Isso envolve a criação de um serviço usando o Axios, que faz requisições HTTP para a API.

## Componentes
Descrição de cada componente React no aplicativo, incluindo seu estado e props. Os componentes incluem:
- `NavBar`: A barra de navegação no topo do aplicativo.
- `LoginPage`: A página de login.
- `RegisterPage`: A página de registro.
- `HomePage`: A página inicial.
- `CartPage`: A página do carrinho de compras.
- `OrderHistoryPage`: A página do histórico de pedidos.
- `AdminPage`: A página do administrador.
- `Footer`: O rodapé do aplicativo.

## Fluxo de Dados

O sistema inicia na página inicial onde se encontram vários lanches. Por meio de uma interface simples, o usuário pode adicionar os lanches de sua preferência no seu carrinho. Ele só pode finalizar o pedido se estiver autenticado, por isso é redirecionado para o login. Caso ele não possua registro no sistema, ele pode se cadastrar. Ao se registrar ou fazer login no site e, posteriormente, finalizar seu pedido, ele pode verificar seu histórico de pedidos em um link que aparece como *Pedidos* na barra de navegação.


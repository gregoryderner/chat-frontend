# Projeto de Demonstração

Este projeto foi desenvolvido com o objetivo de demonstrar várias técnicas de desenvolvimento web, incluindo:

- **Uso de Broadcast (WebSocket)**
- **Autenticação Simples com JWT**
- **Princípios Básicos de SOLID no Frontend**
- **Transmissão de Eventos**
- **Criptografia Ponta a Ponta**

O intuito principal é explicar as decisões tomadas durante o desenvolvimento, especialmente considerando o tempo limitado disponível para completar o projeto. Ressalto que é um erro **GRAVÍSSIMO** expor a chave privada no `localStorage` como está feito aqui, mas fiz isso propositalmente para discutir essa prática.

## Pontos de Melhoria

1. **Componentização**: Componentizar mais o código, mas sem exagerar para não criar uma complexidade desnecessária. Componentes bem definidos facilitam a manutenção e a reutilização.
2. **Separação de Conceitos**: Melhorar a separação de conceitos e responsabilidades nos arquivos. Uma boa separação ajuda na clareza do código e facilita a colaboração.
3. **Estruturação do Projeto**: Reavaliar a estruturação do projeto para maior clareza e eficiência. Uma estrutura bem organizada é essencial para a escalabilidade e para facilitar o onboarding de novos desenvolvedores.

## Tomadas de Decisões

As decisões tomadas durante o desenvolvimento deste projeto foram fortemente influenciadas pela necessidade de equilibrar eficiência e rapidez, sem comprometer a qualidade do código. Abaixo, descrevo algumas das principais decisões e suas justificativas.

### 1. Uso de React.js Vs Next.js
Optei por React.js devido à simplicidade do projeto e à minha maior familiaridade com esta tecnologia. Next.js não se fez necessário, pois este projeto é simples e não possui perspectivas de crescimento significativo. O tempo era crucial, e minha experiência com React.js permitiu uma implementação mais rápida e eficiente.

### 2. Uso do SQLite como Banco de Dados
Embora o projeto pudesse funcionar sem um banco de dados, escolhi o SQLite por sua semelhança com outros bancos relacionais. A ideia era demonstrar seu uso sem a abstração de um ORM. Além disso, o SQLite é fácil de configurar e perfeito para um projeto de demonstração que não exige um banco de dados robusto.

### 3. Redux Vs Context
Para um projeto pequeno como este, Zustand teria sido a escolha ideal. Redux, embora poderoso, traz uma complexidade desnecessária neste caso. Decidi usar o Context API por ser mais "nativa" e adequada para a simplicidade do projeto. O uso de Context API foi suficiente para gerenciar o estado global sem complicações adicionais.

### 4. Criptografia Ponta a Ponta (PtP) e "O Elefante Rosa na Sala"
O objetivo aqui é demonstrar técnicas de criptografia ponta a ponta, tanto simétrica quanto assimétrica. No projeto, a chave privada é salva no `localStorage`, o que não é seguro, mas foi feito propositalmente para discussão. 

#### Diferenças entre Criptografia Simétrica e Assimétrica
1. **Simétrica**:
   - **Chave Única**: Uma única chave para criptografar e descriptografar.
   - **Velocidade**: Geralmente mais rápida.
   - **Exemplos**: AES, DES, 3DES.

2. **Assimétrica**:
   - **Par de Chaves**: Um par de chaves (pública e privada).
   - **Segurança na Distribuição de Chaves**: A chave pública pode ser distribuída livremente, enquanto a chave privada deve ser mantida em segredo.
   - **Velocidade**: Geralmente mais lenta devido à complexidade matemática.
   - **Exemplos**: RSA, ECC.

### Armazenamento Seguro da Chave Privada
Idealmente, a chave privada não deveria ser armazenada em texto simples no `localStorage`. Utilizar serviços de gerenciamento de chaves como AWS KMS, Google Cloud KMS ou Azure Key Vault seria mais seguro. Alternativamente, poderíamos usar a Web Crypto API para criptografar a chave privada com uma senha fornecida pelo usuário a cada sessão, tornando o armazenamento mais seguro.

## Estrutura do Projeto

O projeto é organizado de forma a demonstrar boas práticas de desenvolvimento e separação de responsabilidades. Abaixo, uma visão geral dos principais arquivos e suas responsabilidades:

- **src/index.js**: Ponto de entrada da aplicação, configura o tema, o contexto de autenticação e as rotas.
- **src/App.js**: Componente principal que envolve outros componentes com um `Container`.
- **src/theme.js**: Configura o tema da aplicação usando o Material-UI.
- **src/hooks/**: Contém diversos hooks personalizados para gerenciar autenticação, WebSocket, formulários, e chaves criptográficas.
- **src/context/AuthContext.js**: Define o contexto de autenticação, incluindo métodos para login, logout e manutenção do estado do usuário.
- **src/services/authService.js**: Serviço para lidar com requisições de autenticação, como login, registro e armazenamento de chaves públicas.
- **src/utils/crypto.js**: Funções utilitárias para operações criptográficas, incluindo geração, importação e exportação de chaves, além de criptografia e descriptografia de mensagens.
- **src/components/**: Contém componentes reutilizáveis como Login, Register e Chat, cada um com suas respectivas responsabilidades.

Essa estrutura visa manter o código organizado, modular e fácil de entender, permitindo que cada parte do sistema seja desenvolvida e testada de forma independente.

## Instruções para Executar o Código

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados em sua máquina.


**Esse projeto depende do repositório:**
*[chat-backend](https://github.com/gregoryderner/chat-backend.git)*
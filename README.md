# Objetivo do Projeto

![Demo Projeto](demo/Projeto.gif)

Este projeto foi feito com base nas aulas da Rocketseat.

O objetivo foi desenvolver um player de aulas parecido com o que a Rocketseat usa em suas aulas. Obtemos os módulos e suas aulas de uma API mockada com ajuda do json-server, e guardamos os dados dentro do Redux, para renderizarmos na tela.
Com a ajuda do Redux, é possível fazer com que a próxima aula seja reproduzida automaticamente após o término da anterior, e caso o módulo inteiro seja concluido, é passado para o próximo automaticamente.

Também com a ajuda do Vitest, foram criados testes unitários para validar a funcionalidade do video player: se ele conseguiu reproduzir o próximo vídeo, ou trocar para o próximo módulo automaticamente, por exemplo.

## Como iniciar o projeto

Após clonar o projeto, precisamos usar o seguinte comando para instalar as dependências do projeto: 

```js
   npm i
```

Em seguida, precisamos executar tanto o projeto React, quanto a API mockada. Para isso, execute os seguintes comandos em dois powershells diferentes:

```js
   npm run dev
```

```js
   npm run server
```

# Conversor de Moedas - Stone Currency

Este é um projeto de conversão de valores de dólar para real, desenvolvido em Angular 17, utilizando TypeScript e Bootstrap 5.3. O projeto consome uma API de Moedas para obter dados reais do dólar, IOF, impostos e taxas. A aplicação possui duas etapas: uma para inserir o valor que se deseja converter e outra para mostrar os valores convertidos.

## Tecnologias Utilizadas

- Angular 17
- TypeScript
- Bootstrap 5.3
- ng2-currency-mask
- [Vercel](https://stone-test-beta.vercel.app/) (para deploy)
- Testes unitários utilizando JEST (em andamento)

## Funcionalidades

A aplicação mostra os seguintes dados:

- Cotação do dólar
- IOF
- Total em dólar sem imposto
- Total em dólar com imposto
- Total em real sem imposto
- Total em real com imposto

## API de Moedas

Para realizar os cálculos, foi necessário consultar a cotação atual na [API de Moedas](https://docs.awesomeapi.com.br/api-de-moedas)  

## Preview

- Página Inicial
![image](https://github.com/FelipeSantanaa/stone-test/assets/69217173/e50d86b2-e9f7-4fe6-a21b-71d65bb69dbf)

- Página com o valor convertido
![image](https://github.com/FelipeSantanaa/stone-test/assets/69217173/ff6be5c9-5e35-49fc-9202-ac0d2d9bccc1)


## Stone

Este projeto foi desenvolvido para um teste que encontrei na internet da empresa Stona, para obter mais informações acesse [PROJETO OFICIAL](https://github.com/stone-payments/template-desafio-web?tab=readme-ov-file)

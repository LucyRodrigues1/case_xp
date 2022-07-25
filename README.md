# Projeto de BackEnd do Processo Seletivo da XP
## Instruções de como a API funciona:

O projeto é Dockerizado, então primeiramente deve-se rodar o seguinte comando no terminal:
‘docker-compose up -d’

E em seguida:
‘docker exec -it projeto_xp bash ’

Agora instale as dependências com:
‘npm install’

- Rodar o Sequelize para a criar e popular as tabelas do banco de dados, primeiro devemos ir até a pasta **/src/database**, dentro do projeto e depois executar os seguintes comando no terminal:
‘npx sequelize db:migrate’

Depois:
‘npx sequelize db:seed:all’

Agora vamos rodar a API com o comando:
‘npm run debug’

Certo, agora a API já está rodando e vamos as instruções de como utilizar ela.
Para usar a API primeiramente você precisa de um cadastro para adquirir um TOKEN, deverá cadastrar um usuário com o método POST pela rota http://localhost:3000/usuario/cadastrar, o corpo da requisição deve ficar da seguinte forma:

INPUT:
```
{
    "userName": "Lucy",
    "email": "lucy@gmail.com",
    "password": "123456"
}
```
OUTPUT:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y3kyQGdtYWlsLmNvbSIsImlhdCI6MTY1ODcwOTgxMiwiZXhwIjoxNjYwMDA1ODEyfQ.KzK3c632YiVVRiIlEJju_r7uYvpzYNarVqLaE0Ae23Y"
}
```
Se precisar de outro TOKEN pode fazer login com o método POST pela rota http://localhost:3000/login
INPUT:
```
{
    "email": "lucy@gmail.com",
    "password": "123456"
}
```
OUTPUT:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y3kyQGdtYWlsLmNvbSIsImlhdCI6MTY1ODcwOTgxMiwiZXhwIjoxNjYwMDA1ODEyfQ.KzK3c632YiVVRiIlEJju_r7uYvpzYNarVqLaE0Ae23Y"
}
```
A  partir daqui toda a requisição deverá ser feita com o TOKEN na chave authorization no Header das requisições.
Para comprar ativos devera ser feita uma requisição com o método POST para o endereço http://localhost:3000/investimentos/comprar

INPUT no corpo da requisição:
```
{
    "codCliente": 3,
    "codAtivo": 1,
    "qtdeAtivo": 5
}
```
OUTPUT:
```
{
    "investimento": {
        "id": 3,
        "stockId": 1,
        "amount": 15,
        "totalRate": "150.00",
        "clientId": 3
    }
}
```
Para comprar vender deverá ser feita uma requisição com o método POST para o endereço http://localhost:3000/investimentos/vender

INPUT no corpo da requisição:
```
{
    "codCliente": 3,
    "codAtivo": 1,
    "qtdeAtivo": 5
}
```
OUTPUT:
```
{
    "investimento": {
        "id": 3,
        "stockId": 1,
        "amount": 10,
        "totalRate": "100.00",
        "clientId": 3
    }
}
```
Para listar uma pessoa cliente especifica e mostrar os ativos que ela possui em sua carteira deve-se fazer uma requisição com o método GET pela url http://localhost:3000/clientes/{códigoDoCliente}

Exemplo de OUTPUT:
```
[
    {
        "CodCliente": 1,
        "CodAtivo": 1,
        "QtdeAtivo": 5,
        "Valor": "10.00"
    },
    {
        "CodCliente": 1,
        "CodAtivo": 2,
        "QtdeAtivo": 10,
        "Valor": "12.00"
    }
]
```
Para listar os ativos em que podem ser comprados deve-se fazer uma requisição com o método GET pela url  http://localhost:3000/ativos

Exemplo de OUTPUT:
```
[
    {
        "id": 1,
        "code": "AZULl4",
        "companyName": "Azul",
        "price": "10.00",
        "amount": 197
    },
    {
        "id": 2,
        "code": "PETR4",
        "companyName": "Petrobras",
        "price": "12.00",
        "amount": 343
    },
    {
        "id": 3,
        "code": "VALE4",
        "companyName": "Vale do Rio Doce",
        "price": "24.00",
        "amount": 512
    }
]
```
Para mostrar só um ativo específico deve-se fazer uma requisição com o método GET pela url  http://localhost:3000/ativos/{códigoDoAtivo}

Exemplo de OUTPUT:
```
{
    "CodAtivo": 2,
    "code": "PETR4",
    "companyName": "Petrobras",
    "QtdeAtivo": 343,
    "Valor": "12.00"
}
```
Para fazer deposito na conta de um cliente deve-se utilizar o método PUT com o caminho http://localhost:3000/conta/deposito
Exemplo de INPUT:

```
{
    "CodCliente": 1,
    "Valor": 12.32
}
```
Para fazer deposito na conta de um cliente deve-se utilizar o método PUT com o caminho http://localhost:3000/conta/saque
Exemplo de INPUT:

```
{
    "CodCliente": 1,
    "Valor": 12.32
}
```
Para mostrar o saldo de uma pessoa cliente, deve se fazer uma requisição com o  método GET para http://localhost:3000/conta/{CódigoDoCliente}
Exemplo de OUTPUT:

```
{
    "CodCliente": 1,
    "Saldo": "167.28"
}
```













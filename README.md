# WhishList

WhishList é o projeto de teste técnico para um processo seletivo, com o conceito de "Lista de Desejos" em um portal com produtos podendo assim adicionar produtos a lista e remove-los.

Por não ter especificação das funcionalidade de tela, foram adicionados de acordo o layout solicitado:
- Busca de Produtos
- Localizar cidade do usuário
- Breadcrumb 
- Adição e remoção de itens da lista ao clicar no ícone de coração
- Remoção da lista ao clicar no ícone de "x"

## Tecnologias usadas

- [Node.js](https://nodejs.org/)
- [Expres](https://expressjs.com/pt-br/)
- [Axios](https://github.com/axios/axios)
- [SASS/SCSS](https://sass-lang.com)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Eslint](https://eslint.org/)

## Instalação

Partindo da pasta raiz após o clone.

```bash
cd whishlist/whishlist
npm install
```

## Inicialização do projeto

Para dar inicio ao servidor bastar usar

```node
npm start
```

Após isso basta acessar o Link: [http://localhost:3000](http://localhost:3000)


## API Reference

#### POST City
Retorna informações de cidade do usuário conforme a latitude e longitude informada.

```http
  POST /api/findcity
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lat` | `number` | **Required**. Latitude|
| `lon` | `number` | **Required**. Longitude|

#### POST favorite products
Adiciona novos produtos a lista de favoritos

```http
  POST /api/favoriteProducts
```

| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `sku` | `number` | **Required**. SKU do produto|

#### DELETE favorite products
Remove um produto da lista de favoritos

```http
  DELETE /api/favoriteProducts/:SKU
```

#### GET favorite products
Retorna todos os produtos salvos como favoritos.

```http
  POST /api/favoriteProducts
```

#### Get products

Retorna todos os produtos disponiveis.

```http
  GET /api/products
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

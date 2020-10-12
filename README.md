# Exemplo de uso do TypeORM

## Exemple of using TypeORM

O [TypeORM](https://typeorm.io/ "Documentação do TypeORM") é uma ferramenta extretamente flexível, capaz de rodar em várias plataformas e permite a implementação de patterns diferentes no código.

Neste exemplo foi criada uma tabela no banco de dados (users), duas entidades representando a mesma tabela e cinco controllers diferentes para a mesma tabela demonstrando várias formas diferentes de trabalhar o banco de dados.

Além dos patterns [Active Record](https://pt.wikipedia.org/wiki/Active_record "Artigo no Wikipedia") e [Data Mapper](https://pt.wikipedia.org/wiki/Data_mapper "Artigo no Wikipedia"), o TypeORM ainda permite o uso de outras variantes que permitem uma maior gama de possibilidades no desenvolvimento. Cada controller deste exemplo trabalha com a mesma tabela no banco de dados, porém cada um utiliza um padrão diferente para tal:

* Active Record

* Data Mapper com repository

* Data Mapper com manager

* Query builder

* Data Mapper com repository customizado

Foram utilizados para testes automatizados o [Chai](https://www.chaijs.com/ "Site da ferramenta") e o [Mocha](https://mochajs.org/ "Site da ferramenta") para validar a conformidade dos resultados entre os diferentes padrões. Dessa forma, nota-se que apesar de usar padrões diferentes é possível obter resultados equivalentes.

### Instruções

Para usar este exemplo, recomenda-se os seguintes comandos:



Instalar as dependências do projeto

```
yarn
```

Executar a migration

```
yarn migrate
```

Rodar a aplicação

```
yarn dev
```

Executar os testes automatizados

```
yarn test
```



## Projeto de uma Aplicação Back-End (CRUD) - seguindo as métricas de engenharia de software:
### O que um CRUD?
> Nas manipulações de registros realizadas diretamente em banco de dados ou em plataformas
> desenvolvidas no padrão RESTful, o conceito CRUD estabelece o modelo correto no manuseio
> desses dados.
> CRUD representa as quatro principais operações realizadas em banco de dados, seja no modelo 
> relacional (SQL) ou não-relacional (NoSQL), facilitando no processamento dos dados e na 
> consistência e integridade das informações.  
> [Fonte de Informação: Blog byTrybe ](https://blog.betrybe.com/tecnologia/crud-operacoes-basicas/);

### Setup da Aplicação:

#### 1 - Passos Iniciais (check List):

- [x] Criando uma Pastas CrudeNode;

```console
mkdir CrudNode
```

- [x] - Entrando na pasta;

```console
cd CrudNode
```
- [x] - Criar um arquivo README.md;

```console
touch README.md
```

- [x] - criar uma arquivo .gitignore e colocar corpo do arquivo node_modules como pasta a ser ignorada 

```console
touch .gitignore
```
> Dentro do Arquivo no corpo colocar: node_modules/

- [x] - Executar o comando de inicialização do git localmente na pasta;

```console
git init
```

- [x] - Criar um repositório remoto no github;
  
```text
tonistorres/CrudNodePinar
``` 
- [x] - Lincar o Repositório remoto ao repositório local; 

```text
git remote add origin git@github.com:tonistorres/CrudNodePinar.git
```

- [x] - instalar o "git-commit-msg-linter": "^4.1.1";

```console
npm i git-commit-msg-linter -D
```

- [x] - Criar uma branch tonis-torres-crud-node;

```console
git checkout -b tonis-torres-crud-node;
```
> Alguns comandos git util no desenvolvimento:

```console
git status
git add .
git commit -m""
git push
git push -u origin nome_branch
git pull
git log 
git log --oneline
git tag "nome_tag" -m"" 
git tag -a "nome_tag" -m"" id
```
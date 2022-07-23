<h1>API NODE</h1>

<p>Esta API simula um ambiente de uma corretora de investimentos;</p>
<p>O cliente cadastrado poderá realizar depósitos, saques, compra e venda de ações;</p>

<h2>Objetivo</h2>
<p>Por meio desta API é possível realizar o cadastro de um cliente;</p>
<p>Ao fazer o login utilizando o código do cliente e o password, o cliente poderá fazer operações como:</p>

<ul>
<li>Consultar o próprio saldo</li>
<li>Realizar depósito</li>
<li>Realizar saque</li>
<li>Consultar a lista de ações cadastradas</li>
<li>Realizar compra e venda de ações;</li>
<li>Consultar o Saldo de Investimentos;</li>
</ul>

<h2>Documentação</h2>
<p>A documentação de uso da API, indicando o caminho das rotas, e os inputs esperados, pode ser consultada neste link abaixo.</p>
https://jorgezup-api-node.herokuapp.com/api-docs/

![Screenshot from 2022-07-23 18-04-32](https://user-images.githubusercontent.com/42441349/180625030-86f335e0-6b65-40e9-8ac9-eaf2ebcf9738.png)


<h2>Recomendação</h2>

<p>Este repositório utiliza banco de dados PostgreSQL para que seja realizado as queries.</p>
<p>As variáveis de ambiente podem ser encontradas em .env.example.</p>

<p>É recomendado o uso deste repositório por meio de Docker.</p>
<p>As instruções de instalação e configuração do Docker podem ser encontradas neste link https://docs.docker.com/get-docker/.</p>

<h3>Opção sem Docker</h3>
<p>Caso tenha optado por utilizar o repositório sem Docker siga as instruções abaixo:</p>

<p>Para instalar as dependências:</p>

<p><code>npm install</code></p>

<p>Para executar em modo de desenvolvimento:</p>

<p><code>npm run dev</code></p>

<p><i><b>** Após a instalação e configuração do Banco de Dados utilizando as variáveis de ambiente **</b></i></p>

<p>Execute as migrations para iniciar o Banco de Dados, por meio do comando:</p>

<p><code>npm migrate:run</code></p>

<h3>Opção com Docker</h3>
<p>Caso tenha optado por utilizar o repositório com o Docker siga as instruções abaixo:</p>

<p>Para executar o container em modo de desenvolvimento:</p>

<p><code>docker compose up</code> </p>

<p>Para executar o container em modo de produção:</p>

<p><code>docker compose -f docker-compose.prod.yml up -d</code></p>

<p>Possui alguns dados pré-cadastrados:</p>

<p><b>Usuário Administrador (o qual pode cadastrar uma nova ação)</b></p>

<p><code>codClient -> 308033 ; accountId -> 1;  password -> 999999</code></p>

<p><b>Usuário comum</b></p>

<p><code>codClient -> 195031; accountId 2 -> password -> 888888</code></p>

<h2>Instruções de Uso</h2>
<p>Ao acessar a rota <b>/clientes/criar</b>, será possível criar um novo cliente informando os dados como consta na documentação</p>
<p>Para fazer o login na aplicação será necessário informar o código do cliente e a senha;</p>
<p>Ao fazer o login, será enviado como resposta o <b>Token</b>.</p>
<p>É necessário informar o <b>Token</b> em todas as requisições;</p>
<p>É necessário informar na requisição das demais rotas o número da conta do cliente, este número da conta é informado no momento da criação da conta;</>
<p><b>IMPORTANTE:</b>o número da conta do cliente é diferente do código do cliente.</p>

<h2>Tecnologias Utilizadas</h2>
<p>Para realização deste trabalho foi utilizado as seguintes tecnologias;</p>

<ul>
<li>TypeScript</li>
<li>Express</li>
<li>TypeORM</li>
<li>Docker</li>
<li>Swagger</li>
<li>Heroku</li>
<li>Github Action</li>
</ul>


<h2>Modelo entidade relacionamento</h2>
![api_rest_xp - public](https://user-images.githubusercontent.com/42441349/180625022-df21cb41-3c00-4e50-8397-7906a8dda031.png)



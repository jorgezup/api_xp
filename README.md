<h1>API NODE</h1>

<p>Esta API simula um ambiente de uma corretora de investimentos;</p>
<p>O cliente cadastrado poderá realizar depósitos, saques, compra e venda de ações;</p>

<h2>Objetivo</h2>
<p>Por meio desta API um cliente poderá realizar seu cadastro</p>
<p>Ao fazer o login utilizando o código do cliente e a senha, o cliente poderá fazer operações como:</p>

<ul>
<li>Consultar o próprio saldo</li>
<li>Realizar depósito e saque</li>
<li>Consultar a lista de ações cadastradas</li>
<li>Realizar compra e venda de ações;</li>
<li>Consultar o Saldo de Investimentos;</li>
</ul>

<h2>Documentação</h2>
<p>A documentação de uso da API, indicando o caminho das rotas, e as entradas esperadas, pode ser consultada neste link abaixo.</p>
<span><strong>DEPLOY NO HEROKU -></strong></span>
<a href="https://jorgezup-api-node.herokuapp.com/api-docs/" target="_blank">https://jorgezup-api-node.herokuapp.com/api-docs/</a>

<br />

![Documentacao Swagger](https://user-images.githubusercontent.com/42441349/180625030-86f335e0-6b65-40e9-8ac9-eaf2ebcf9738.png)

<h2>Informações para Teste e Uso da API</h2>

<p>Esta aplicação utiliza banco de dados PostgreSQL para armazenar as informações.</p>
<p>As variáveis de ambiente podem ser encontradas em <b>.env.example</b>.</p>

<h2>Recomendação</h2>

<p>É recomendado o uso deste repositório por meio de Docker.</p>
<p>As instruções de instalação e configuração do Docker podem ser encontradas neste link https://docs.docker.com/get-docker/.</p>

<br />
<details>
<summary><strong>Opção sem Docker</strong></summary>
<p>Caso tenha optado por utilizar o repositório sem Docker siga as instruções abaixo, após o clone do repositório.</p>

<p>Para instalar as dependências:</p>

<p><code>npm install</code></p>

<p>Para executar em modo de desenvolvimento:</p>

<p><code>npm run dev</code></p>

<p><i><b>** Após a instalação e configuração do Banco de Dados utilizando as variáveis de ambiente **</b></i></p>

<p>Execute as migrations para iniciar o Banco de Dados, por meio do comando:</p>

<p><code>npm migrate:run</code></p>
</details>

<hr />

<details>
<summary><strong>Opção com Docker</strong></summary> 
<p>Caso tenha optado por utilizar o repositório com o Docker siga as instruções abaixo, após o clone do repositório.</p>

<p>Para executar o container em modo de desenvolvimento:</p>
<smal>O docker irá iniciar os containers da API (node) e do PostgreSQL, e ficar pronto para o desenvolvimento.</small>

<p><code>docker compose up</code> </p>

<p>Para executar o container em modo de produção:</p>

<p><code>docker compose -f docker-compose.prod.yml up -d</code></p>

<p><b>Possui alguns dados pré-cadastrados:</b></p>

<p><b>Usuário Administrador</b>
<small> (o qual pode cadastrar uma nova ação)</small></p>
<blockquote>
    codClient -> 308033  <br/>
    accountId -> 1 <br/>
    password  -> 999999
</blockquote>
<br />
<p><b>Usuário comum</b></p>
<blockquote>
    codClient -> 195031 <br />
    accountId -> 2 <br />
    password  -> 888888
</blockquote>
</details>
<br />

<h2>Instruções de Uso</h2>
<br />
<details>
<summary><strong>Para criar um novo cliente</strong></summary><br />
<p><strong>Rota: </strong>/clientes/criar</p>
<p>Ao acessar esta rota, será possível criar um novo cliente informando os dados como consta na <a href="https://jorgezup-api-node.herokuapp.com/api-docs/" target="_blank">documentação</a>.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"name":"John", <br />
&emsp;"surname":"Doe", <br />
&emsp;"email":"john.doe@email.com", <br />
&emsp;"password":"888888" <br />
} <br />
</blockquote>
<br />
</details>
<hr />
<details>
<summary><strong>Para fazer o login na aplicação</strong></summary><br />
<p><strong>Rota: </strong>/clientes/entrar</p>
<p>Será necessário informar o código do cliente e a senha;</p>
<blockquote>
{ <br />
&emsp;"codClient":443808, <br />
&emsp;"password":"999999" <br />
} <br />
</blockquote>
</br>
<p>Ao fazer o login, será enviado como resposta o <b>Token</b>.</p>
<blockquote>
{ <br />
&emsp;"token": 6581e00ebccf5ac6628db47b9487153281dd1d450ad6a064e25c1488cfdc920c24b5d24c5a2695592e73dd581fdf05e30b534087f4002debd8353d91b7959115035051081026f709c2b7e8e7fb752704 <br />
} <br />
</blockquote>
<br/>
<h4 style="text-align:center; font-weight: bold; color: red">IMPORTANTE</h4>
<p>É necessário informar o <b>Token</b> em todas as requisições;</p>
<p>É necessário informar na requisição das demais rotas o número da conta do cliente (accountId), este número da conta é informado no momento da criação da conta;</>
<p>O número da conta do cliente (accountId) é diferente do código do cliente (codClient).</u></p>
<br />
</details>
<hr />
<details>
<summary><strong>Para acessar o saldo do cliente</strong></summary><br />
<p><strong>Rota: </strong>/conta/accountId/saldo</p>
<p>Ao acessar esta rota, será possível ver o saldo da conta.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"codClient": 292053, <br />
&emsp;"saldo": 954.24 <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para realizar um depósito</strong></summary><br />
<p><strong>Rota: </strong>/conta/accountId/deposito</p>
<p>Ao acessar esta rota, será possível realizar a operação de depósito.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"value":1100.89 <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para realizar um saque</strong></summary><br />
<p><strong>Rota: </strong>/conta/accountId/saque</p>
<p>Ao acessar esta rota, será possível realizar a operação de saque.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"value":298.00 <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para acessar o saldo dos Investimentos</strong></summary><br />
<p><strong>Rota: </strong>/investimentos/accountId/saldo</p>
<p>Ao acessar esta rota, será possível ver o saldo dos investimentos.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"codStock": 106459, <br />
&emsp;"stockname": "PETR4", <br />
&emsp;"stocksquantity": "5", <br />
&emsp;"avgprice": "29.33" <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para realizar a compra de uma ação</strong></summary><br />
<p><strong>Rota: </strong>/investimentos/accountId/comprar</p>
<p>Ao acessar esta rota, será possível realizar a operação de compra de uma ação.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"codStock":106459, <br />
&emsp;"quantity":5 <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para realizar a venda de uma ação</strong></summary><br />
<p><strong>Rota: </strong>/investimentos/accountId/vender</p>
<p>Ao acessar esta rota, será possível realizar a operação de venda de uma ação.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"codStock":106459, <br />
&emsp;"quantity":9 <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para listar as ações disponíveis</strong></summary><br />
<p><strong>Rota: </strong>/acoes</p>
<p>Ao acessar esta rota, será possível listar todas as ações cadastradas na corretora com o preço atualizado.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
[<br />
&emsp;{ <br />
&emsp;&emsp;"codStock": 106459, <br />
&emsp;&emsp;"name": "PETR4", <br />
&emsp;&emsp;"value": 29.33 <br />
&emsp;} <br />
]
</blockquote>
<br />
</details>
<hr />

<details>
<summary><strong>Para cadastrar uma nova ação na corretora</strong></summary><br />
<p><strong>Rota: </strong>/acoes</p>
<p>Ao acessar esta rota, será possível cadastrar uma nova ação na corretora.</p>
<p><strong>Somente administradores possuem essa permissão.</strong></p>
<br />
<p><strong>API Externa: </strong>Foi utilizado a API fornecida pela HG Brasil <a href="https://hgbrasil.com/status/finance" target="_blank">https://hgbrasil.com/status/finance</a> https://hgbrasil.com/status/finance </p>
<p>Foi utilizado o endpoint do plano gratuito que retorna apenas os dados de uma ação conforme o código informado.</p>
<p>Para informações de uso desta API consulte a <a href="https://console.hgbrasil.com/documentation/finance" target="_blank">documentação</a>.</p>
<p><strong>Exemplo:</strong></p>
<blockquote>
{ <br />
&emsp;"name": "MGLU3" <br />
} <br />
</blockquote>
<br />
</details>
<hr />

<h2>Tecnologias Utilizadas</h2>
<p>Para realização deste trabalho foi utilizado as seguintes tecnologias;</p>

<ul>
<li>TypeScript</li>
<li>Express</li>
<li>TypeORM</li>
<li>PostgreSQL</li>
<li>Docker</li>
<li>Swagger</li>
<li>Heroku</li>
<li>Github Action</li>
</ul>

<h2>Modelo entidade relacionamento</h2>

![api_rest_xp - public](https://user-images.githubusercontent.com/42441349/180655044-c7e479b5-bb4f-4971-93fc-b8914524e165.png)

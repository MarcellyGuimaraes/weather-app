# Weather App API

### Backend
#### Descrição
Este projeto é uma API RESTful construída com Laravel para fornecer dados sobre o clima de diferentes cidades. Ele utiliza a API do OpenWeather para buscar informações climáticas.

#### Tecnologias Utilizadas
- Laravel
- MySQL
- Docker
- Composer

#### Instalação

##### Pré-requisitos
- Docker e Docker Compose instalados.
- PHP e Composer instalados.

##### Passos para Instalação

1. **Navegue até o diretório do projeto**:  
   [`cd backend`]

2. **Configure o ambiente com Docker**:  
   - Certifique-se de que o arquivo `docker-compose.yml` está no diretório `backend/docker`. Caso não esteja, siga o modelo apresentado na documentação.  
   - Suba os containers Docker:  
     [`cd docker`]  
     [`docker-compose up -d`]

3. **Copie o arquivo de configuração**:  
   [`cp .env.example .env`]

   - No arquivo `.env`, substitua `[CHAVE API OPEN WEATHER]` pela sua chave de API obtida no [OpenWeather](https://home.openweathermap.org/api_keys).

4. **Instale as dependências do Laravel**:  
   [`composer install`]

5. **Teste a conexão com o banco de dados**:  
   [`php artisan migrate`]

6. **Execute o servidor de desenvolvimento**:  
   [`php artisan serve`]

   O servidor estará disponível em [`http://localhost:8000`].

#### Funcionalidades da API
- Registro de usuários.
- Login e autenticação via tokens.
- Consulta climática para cidades específicas.

#### Endpoints

##### 1. Login
**Endpoint:** `POST /api/login`  
**Descrição:** Realiza o login de um usuário existente e retorna um token de autenticação.  

**Exemplo de Payload:**  
[`{
    "email": "user@example.com",
    "password": "password123"
}`]

**Exemplo de Retorno:**  
[`{
    "token": "[TOKEN]",
    "user": {
        "id": 1,
        "name": "Example User",
        "email": "user@example.com"
    }
}`]

---

##### 2. Registro
**Endpoint:** `POST /api/register`  
**Descrição:** Cria um novo usuário no sistema.  

**Exemplo de Payload:**  
[`{
    "name": "New User",
    "email": "newuser@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}`]

**Exemplo de Retorno:**  
[`{
    "token": "[TOKEN]",
    "user": {
        "id": 2,
        "name": "New User",
        "email": "newuser@example.com"
    }
}`]

---

##### 3. Consulta de Clima
**Endpoint:** `POST /api/weather`  
**Descrição:** Retorna informações climáticas de uma cidade específica. Requer autenticação via token.  

**Exemplo de Payload:**  
[`{
    "city": "Salvador"
}`]

**Headers Necessários:**  
[`Authorization: Bearer [TOKEN]`]

**Exemplo de Retorno:**  
[`{
    "city": "Salvador",
    "temperature": "30°C",
    "description": "Ensolarado",
    "humidity": "70%",
    "wind_speed": "12 km/h"
}`]

---

##### Observações
- As requisições devem ser feitas no formato JSON.
- Use o token obtido no login ou no registro para acessar rotas protegidas.  
- As consultas climáticas são limitadas a cidades que estejam disponíveis na API OpenWeather.


---



### Frontend
#### Descrição
Este projeto é uma aplicação frontend em React que permite aos usuários consultar informações sobre o clima de diferentes cidades.

#### Tecnologias Utilizadas
- React
- Axios
- JavaScript
- CSS (para estilização)

#### Instalação
1. Clone o repositório:
   ```bash
   git clone <URL do repositório>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

#### Uso
1. Inicie a aplicação:
   ```bash
   npm start
   ```
2. Acesse a aplicação no navegador em `http://localhost:3000`.

#### Funcionalidades
- Campo de entrada para o nome da cidade.
- Botão para buscar informações do clima.
- Exibição de dados climáticos, incluindo temperatura, descrição, umidade e velocidade do vento.
- Mensagens de erro para entradas inválidas ou problemas na consulta.

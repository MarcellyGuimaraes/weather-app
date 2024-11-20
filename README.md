## WEATHER APP API

### Backend
##### Como Rodar o projeto com Docker
Certifique-se de que o arquivo ```backend/docker/docker-compose.yml``` já esteja no projeto.
Caso não esteja, deve ser criado com esses dados:
```
version: "3.9"
services:
  mysql:
    image: mysql:8.0
    container_name: mysql_docker
    ports:
      - "3307:3306" # Mapeia a porta 3307 no host para a 3306 no container
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: weather_app
      MYSQL_USER: root2
      MYSQL_PASSWORD: root2
    volumes:
      - db_data:/var/lib/mysql # Persistência dos dados

volumes:
  db_data:
```
Suba o container executando no terminal, a partir da raiz do projeto:

```
cd backend/docker
docker-compose up -d
```
O MySQL estará disponível em ```127.0.0.1``` na porta ```3307```. 
Copie o arquivo .env.example para .env (nele já tem toda a configuração do banco de dados) com o comando:
```
  cp .env.example .env
```

E substitua ```[CHAVE API OPEN WEATHER]``` pela sua chave da api. 
Você consegue criar a partir desse link https://home.openweathermap.org/api_keys

Teste a conexão com:

```
php artisan migrate
```

Rode o projeto localmente com o comando:

```
composer run dev
```

##### Rotas da API

###### 1. Rota de Login

**Endpoint:** `POST /api/login`

**Descrição:** Realiza o login do usuário.

**Exemplo de chamada:**
```
curl --location 'http://localhost:8000/api/login' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "email": "weather@app.com",
    "password": "12345678"
}'
```

**Exemplo de retorno:**
```json
{
    "token": "[TOKEN]",
    "user": {
        "id": 1,
        "name": "Weather App",
        "email": "weather@app.com"
    }
}
```

---

###### 2. Rota de Registro

**Endpoint:** `POST /api/register`

**Descrição:** Registra um novo usuário.

**Exemplo de chamada:**
```
curl --location 'http://localhost:8000/api/register' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "name": "Weather App",
    "email": "weather@app.com", 
    "password": "12345678",
    "password_confirmation": "12345678"
}'
```

**Exemplo de retorno:**
```json
{
    "token": "[TOKEN]",
    "user": {
        "id": 1,
        "name": "Weather App",
        "email": "weather@app.com"
    }
}
```

---

###### 3. Rota de Consulta de Clima

**Endpoint:** `POST /api/weather`

**Descrição:** Obtém informações sobre o clima para uma cidade específica. É necessário um token de autenticação.

**Exemplo de chamada:**
```
curl --location 'http://localhost:8000/api/weather' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer [TOKEN]' \
--data '{"city": "Feira de Santana"}'
```

**Exemplo de retorno:**
```json
{
    "city": "Feira de Santana",
    "temperature": "28°C",
    "description": "Céu limpo",
    "humidity": "60%",
    "wind_speed": "10 km/h"
}
```

###### Observações
- Certifique-se de substituir o token de autenticação no exemplo da rota de consulta de clima pelo token válido que você obteve após o login.
- Os dados enviados nas requisições devem estar no formato JSON, conforme mostrado nos exemplos.
---


### Frontend 
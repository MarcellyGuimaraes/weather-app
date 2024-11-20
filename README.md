## WEATHER APP API

### Backend
##### Como Rodar o MySQL com Docker
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
O MySQL estará disponível em ```127.0.0.1``` na porta ```3307```. Configure o arquivo ```.env``` com os seguintes valores:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=weather_app
DB_USERNAME=root2
DB_PASSWORD=root2
```

Teste a conexão com:

```
php artisan migrate
```

---


### Frontend 
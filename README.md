# Readme

This is a test project containing web-app (frontend part + backend server + mongo app).

## Setup

### 1 - Run mongo with docker

Run containers manually in same network

### 1.1 - Run mongo with docker manually

```bash
# to setup mongo in mongo-network
docker run -d \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --name mongodb \
    --net mongo-network \
    mongo

# to setup mongo-express in mongo-network
docker run -d \
    -p 8081:8081 \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
    --name mongo-express \
    --net mongo-network \
    -e ME_CONFIG_MONGODB_SERVER=mongodb \
    mongo-express
```

### 1.2 Optional - run mongo + mongo-express with docker-compose file

```bash
docker compose up
```

### Setup Mongo

- add new db 'user-account' for mongo on <http://0.0.0.0:8081>

### Run app

### 1.1 - Run locally

```bash
node app/sever.js
```

### 1.2 - Run dockerfile

```bash
# build
docker build -t ci-cd-app:1.0 .

# start container
docker run -d \
    -p 3000:3000 \
    --name ci-cd-app \
    --net ci-cd-test-project_default \
    ci-cd-app:1.0
```

### 1.3 - Run with docker compose

First - uncomment lines 4-7 in docker-compose.yaml

```bash
# then up compose
docker compose up
```

## Results

### Access to apps

- web app - <http://localhost:3000/>
- mongo (no user interface) <http://localhost:27017/>
- mongo-express <http://localhost:8081/>  

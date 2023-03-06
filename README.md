# Readme

## Setup

### Run MongoDB manually

Run containers manually in same network

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

### Setup Mongo

- add new db 'user-account' for mongo on <http://0.0.0.0:8081>

### Run app

```bash
node app/sever.js
```

### Optional - run mongo with docker-compose file

```bash
docker compose up -d
```

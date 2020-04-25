# CC API
An example API using Node.JS, Docker/Docker-compose, Swagger, PostgreSQL and  testing with Jest.

# Building

The recommendation here is using docker. At the root of the project, run:

```
$ docker-compose -f ./docker/docker-compose.yml up -d
```

# Running

Now, you can either run it locally, or in the container you just built
and run:

**With docker:**
```
$ docker exec docker_eye_deploy_1 sh -c "npm install"
$ docker exec -itd docker_eye_deploy_1 sh -c "npm start"
```

**Locally:**
```
$ npm install
$ npm start
```

For convenience there's a script if you prefer using docker:
```
$ sh run.sh -h
$ sh run.sh server
```

# Testing

Same as before, you can either do this locally or in a cotainer:

**Docker:**
```
$ docker exec docker_eye_deploy_1 sh -c "npm run test"
```

**Local:**
```
$ npm run test
```

Again, if you prefer using docker, there's a convenient script:
```
$ sh run.sh -h
$ sh run.sh tests
```

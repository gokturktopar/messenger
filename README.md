# Messenger


This project demonstrate restful node APIs of basic message application.
<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>   
# Getting started

1. Go to project folder and run docker image:
 ```sh
 docker-compose up
 ```
2. Launch development server, and open `localhost:3000/doc` in your browser, hitting that path provide api documentation.

* All of APIs require token (except 'auth' ones), so you can get token from 'auth/login' api. 

3. Runs all tests
 ```sh
docker exec -i {$containerId} npm test
 ```
 *you need to get container id of messenger-server

# Project structure

```
bin/                         entry point of application
doc/                         swagger documentation
src/models/                  database models
src/database-helpers/        database functions 
src/routes/                  api routes
src/services/                business logic
src/middlewares/             middlewares
test/                        api tests
utils/                       utility functions
routes/                      api routes
```


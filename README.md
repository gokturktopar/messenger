# Messenger


This project demonstrate restful node APIs of basic message application.

# Getting started

1. Go to project folder and run docker image:
 ```sh
 docker-compose up
 ```
2. Launch development server, and open `localhost:3000/doc` in your browser, hitting that path provide api documentation.
** except from auth APIs require token, so you can get token from 'auth/login' api. 
3. Runs all tests
 ```sh
docker exec -i {$containerId} npm test
 ```
 ** you need to get container id of messenger-server

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


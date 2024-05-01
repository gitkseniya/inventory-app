Welcome to Inventory App! We sell computers and accessories. 

## To run app in Docker:
`docker-compose build`    
`docker-compose up`  


## To run the app locally:
`npm start` from the frontend folder;  
`npx nodemon src/index.ts` from root repository;  
`npx sequelize-cli db:seed:all` to seed the database;    
`npx jest`  to run tests.

## TODO:
* Create env varioables for local vs dockerized db host
    // host: 'localhost', - db.ts
    // "host": "127.0.0.1", - config.json
* Fill in tests
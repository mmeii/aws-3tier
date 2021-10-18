DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burger (
    id SERIAL NOT NULL , 
    burger_name VARCHAR(100) NOT NULL, 
    devoured BOOLEAN, 
    PRIMARY KEY(id) 
    );

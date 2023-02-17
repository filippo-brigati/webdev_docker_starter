CREATE DATABASE prova;
USE prova;

CREATE TABLE brands (
	brand_id int not null AUTO_INCREMENT,
	brand_name VARCHAR (255) NOT NULL,
    PRIMARY KEY (brand_id)
);

INSERT INTO brands(brand_name) VALUES("FilippoSRL");
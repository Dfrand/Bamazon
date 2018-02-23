-- Created DATABASE and TABLE
create database bamazon;

use bamazon;

CREATE TABLE products
(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10 , 4 ) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

--  Added Products to DATABASE
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("5lb GummyBear","Snacks",23.64,15),
    ("GoldenEye","Video Games",52.73,100),
    ("PitFall","Video Games",47.98,83),
    ("Charmin TP","Bathroom",19.99,47),
    ("Bag O' Chips","Snacks",11.21,68),
    ("Plunger","Bathroom",1.99,200),
    ("Get Out","Movie",19.82,123),
    ("Black Panther","Movie",22.43,77),
    ("Pudding","Snacks",2.76,83),
    ("Shower Curtain","Bathroom",12.45,94);

    SELECT * FROM bamazon.products;
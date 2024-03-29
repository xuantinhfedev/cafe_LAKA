-- Create table User
create table user (
    id int primary key AUTO_INCREMENT,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(255),
    password varchar(255),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name, contactNumber, email, password, status, role) values('Admin', '0856529972', 'admin@gmail.com', 'admin', 'true', 'admin');

-- Create table Category
create table category (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

-- Create table Category for Sales
create table categorySale (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

-- Create table Product
create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    deleted varchar(20),
    primary key(id)
);


-- Create table Product for Sales
create table productSale (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categorySaleId integer NOT NULL,
    description varchar(255),
    price integer,
    sale integer,
    hot integer,
    quantity integer,
    image longtext,
    status varchar(20),
    deleted varchar(20),
    primary key(id)
);

-- Create table Bill
create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);

create table contact (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(255),
    message varchar(255),
)
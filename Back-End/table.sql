-- Create for User
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

-- Create for Ccategory
create table category (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);
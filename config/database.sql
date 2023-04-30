CREATE DATABASE ifsistemas;

USE ifsistemas; 

-- Cadastro de usarios --
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userType VARCHAR(255) DEFAULT 'usuario'
);

-- Cadastro de condutores --
CREATE TABLE condutores (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE usuarios
CHANGE COLUMN nome name VARCHAR(255) NOT NULL,
CHANGE COLUMN senha password VARCHAR(255) NOT NULL,
MODIFY COLUMN tipo VARCHAR(255) DEFAULT 'cliente';

-- Inserir usuário administrador padrão
INSERT INTO usuarios (name, email, password, tipo) 
VALUES ('Admin', 'admin@ifsystem.com', '123456', 'admin');

-- Inserir usuário cliente padrão
INSERT INTO usuarios (name, email, password, tipo) 
VALUES ('Cliente', 'cliente@ifsystem.com', '123456', 'cliente');

-- Alterr plugin de autenticação --
USE mysql;
SELECT user, Host, plugin FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pgadmin';

CREATE TABLE veiculo (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(255) NOT NULL,
  modelo VARCHAR(255) NOT NULL,
  renavam VARCHAR(255) NOT NULL,
  placa VARCHAR(255) NOT NULL,
  dataCompra DATE NOT NULL,
  dataVencimento DATE NOT NULL
);

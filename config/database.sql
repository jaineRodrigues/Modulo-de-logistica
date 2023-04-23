CREATE DATABASE ifsistemas;

USE ifsistemas; 

-- Cadastro de usarios --
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(255) DEFAULT 'usuario'
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


ALTER TABLE usuarios MODIFY COLUMN  tipo VARCHAR(255) DEFAULT 'cliente';


-- Inserir usuário administrador padrão
INSERT INTO usuarios (nome, email, senha, tipo) 
VALUES ('Admin', 'admin@ifsystem.com', '123456', 'admin');

-- Inserir usuário cliente padrão
INSERT INTO usuarios (nome, email, senha, tipo) 
VALUES ('Cliente', 'cliente@ifsystem.com', '123456', 'cliente');

-- Alterr plugin de autenticação --
USE mysql;
SELECT usuarios, Host, plugin FROM mysql.usuarios;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pgadmin';


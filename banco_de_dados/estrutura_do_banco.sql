CREATE DATABASE clinica 
character set utf8mb4
default character set utf8mb4;

USE clinica;

CREATE TABLE pacientes(
	cpf VARCHAR(14) PRIMARY KEY ,
    nome VARCHAR(85) NOT NULL,
    sexo ENUM("masculino","feminino"),
    senha_de_acesso CHAR(64) NOT NULL,
    email VARCHAR(320) NOT NULL
    




)CHARSET = utf8mb4;


CREATE TABLE endereco_paciente(
	cpf_paciente VARCHAR(14) PRIMARY KEY,
    cep INT NOT NULL,
    rua VARCHAR(50) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    numero INT NOT NULL,
    complemento TEXT(150),
    CONSTRAINT fk_enderecos_cliente 
    FOREIGN KEY(cpf_paciente) REFERENCES pacientes(cpf)


)CHARSET = utf8mb4;




CREATE TABLE telefone_pacientes(
	cpf_paciente VARCHAR(14) PRIMARY KEY,
    telefone VARCHAR(14) NOT NULL,
    CONSTRAINT fk_telefones_paciente
    FOREIGN KEY(cpf_paciente) REFERENCES pacientes(cpf)





)CHARSET = utf8mb4;

CREATE TABLE medicos(
	crm VARCHAR(10) PRIMARY KEY,
    especialidade varchar(30) not null,
    nome VARCHAR(85) NOT NULL,
    senha_de_acesso CHAR(64) NOT NULL,
    email VARCHAR(320) NOT NULL
    




)CHARSET = utf8mb4;


CREATE TABLE disponibilidade(

	id_disponibilidade VARCHAR(16) PRIMARY KEY,
    especialidade VARCHAR(20) NOT NULL,
    data_disp DATE NOT NULL,
    hora TIME NOT NULL
    
    




)CHARSET = utf8mb4;


CREATE TABLE registra(

	id_registro VARCHAR(16) PRIMARY KEY,
    crm_medico VARCHAR(10) NOT NULL,
    id_disponibilidade VARCHAR(16),
    CONSTRAINT fk_registros_medico
    FOREIGN KEY(crm_medico) REFERENCES medicos(crm),
    CONSTRAINT fk_disponibilidade_medicos
    FOREIGN KEY(id_disponibilidade) REFERENCES disponibilidade(id_disponibilidade)
    





)CHARSET = utf8mb4;


CREATE TABLE consultas(

	id_consulta VARCHAR(16) PRIMARY KEY,
    crm_medico VARCHAR(10) NOT NULL,
    cpf_paciente VARCHAR(14) NOT NULL,
    data_consulta DATE NOT NULL,
    hora TIME NOT NULL,
    CONSTRAINT fk_medico_consulta
    FOREIGN KEY(crm_medico) REFERENCES medicos(crm),
    CONSTRAINT fk_paciente_consulta
    FOREIGN KEY(cpf_paciente) REFERENCES pacientes(cpf)
    
    
    
    





)CHARSET = utf8mb4;
use clinica;




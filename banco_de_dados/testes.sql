
USE  clinica;

INSERT INTO pacientes  VALUES
('123.456.789-00', 'Ana Beatriz Souza', 'feminino', SHA2('senha123', 256), 'ana.souza@gmail.com', '1995-03-12'),
('987.654.321-00', 'Carlos Eduardo Lima', 'masculino', SHA2('senha456', 256), 'carlos.lima@yahoo.com', '1988-07-25'),
('111.222.333-44', 'Fernanda Costa', 'feminino', SHA2('senha789', 256), 'fernanda.costa@outlook.com', '2000-11-02'),
('555.666.777-88', 'João Pedro Silva', 'masculino', SHA2('joaopedro', 256), 'joao.silva@gmail.com', '1992-04-18'),
('999.888.777-66', 'Mariana Oliveira', 'feminino', SHA2('mariana22', 256), 'mariana.oliveira@uol.com.br', '1997-09-30'),
('222.333.444-55', 'Lucas Martins', 'masculino', SHA2('lucasm@2024', 256), 'lucas.martins@hotmail.com', '1994-01-05'),
('333.444.555-66', 'Bruna Almeida', 'feminino', SHA2('bruna2024', 256), 'bruna.almeida@gmail.com', '1999-08-21'),
('444.555.666-77', 'Felipe Rocha', 'masculino', SHA2('felipe123', 256), 'felipe.rocha@yahoo.com', '1985-12-15'),
('666.777.888-99', 'Juliana Mendes', 'feminino', SHA2('juliana2023', 256), 'juliana.mendes@bol.com.br', '1993-05-06'),
('777.888.999-00', 'Rodrigo Fernandes', 'masculino', SHA2('rodrigo_f', 256), 'rodrigo.fernandes@gmail.com', '1989-10-11');



INSERT INTO endereco_paciente (cpf_paciente, cep, rua, bairro, numero, complemento) VALUES
('123.456.789-00', 90480002, 'Rua Anita Garibaldi', 'Mont Serrat', 101, 'Apto 12'),
('987.654.321-00', 90560000, 'Av. Carlos Gomes', 'Auxiliadora', 202, 'Sala 5'),
('111.222.333-44', 90010000, 'Rua dos Andradas', 'Centro Histórico', 303, ''),
('555.666.777-88', 90610000, 'Av. Ipiranga', 'Jardim Botânico', 404, 'Cobertura'),
('999.888.777-66', 91751230, 'Rua Dona Luísa', 'Restinga', 505, ''),
('222.333.444-55', 91740000, 'Av. Edgar Pires de Castro', 'Lami', 606, ''),
('333.444.555-66', 90810200, 'Rua Cel. Timóteo', 'Floresta', 707, 'Casa B'),
('444.555.666-77', 91030000, 'Av. Assis Brasil', 'São Sebastião', 808, ''),
('666.777.888-99', 91770000, 'Rua Jari', 'Aberta dos Morros', 909, 'Bloco C'),
('777.888.999-00', 91340000, 'Rua Passo da Pátria', 'Vila Jardim', 110, '');





INSERT INTO telefone_pacientes (cpf_paciente, telefone) VALUES
('123.456.789-00', '(51)91234-5678'),
('987.654.321-00', '(51)99876-5432'),
('111.222.333-44', '(51)98765-4321'),
('555.666.777-88', '(51)97654-3210'),
('999.888.777-66', '(51)96543-2109'),
('222.333.444-55', '(51)95432-1098'),
('333.444.555-66', '(51)94321-0987'),
('444.555.666-77', '(51)93210-9876'),
('666.777.888-99', '(51)92109-8765'),
('777.888.999-00', '(51)91098-7654');



select p.senha_de_acesso,p.cpf,p.nome,t.telefone,e.cep,e.rua,e.bairro FROM pacientes p JOIN telefone_pacientes t ON p.cpf = t.cpf_paciente JOIN endereco_paciente e ON p.cpf = e.cpf_paciente;


INSERT INTO registra (id_registro, crm_medico, id_disponibilidade) VALUES
('REG001', 'CRM001', 'DISP001'),
('REG002', 'CRM002', 'DISP002'),
('REG003', 'CRM003', 'DISP003'),
('REG004', 'CRM004', 'DISP004'),
('REG005', 'CRM005', 'DISP005'),
('REG006', 'CRM001', 'DISP006'),
('REG007', 'CRM002', 'DISP007'),
('REG008', 'CRM003', 'DISP008'),
('REG009', 'CRM004', 'DISP009'),
('REG010', 'CRM005', 'DISP010'),
('REG011', 'CRM001', 'DISP011'),
('REG012', 'CRM002', 'DISP012'),
('REG013', 'CRM003', 'DISP013'),
('REG014', 'CRM004', 'DISP014'),
('REG015', 'CRM005', 'DISP015'),
('REG016', 'CRM001', 'DISP016'),
('REG017', 'CRM002', 'DISP017'),
('REG018', 'CRM003', 'DISP018'),
('REG019', 'CRM004', 'DISP019'),
('REG020', 'CRM005', 'DISP020');






DESCRIBE registra;

SELECT * FROM disponibilidade;
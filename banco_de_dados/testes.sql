
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


INSERT INTO medicos (crm, especialidade, nome, senha_de_acesso, email) VALUES
('123456SP', 'Cardiologia', 'Dr. João Silva', 'a3f5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5', 'joao.silva@clinic.com'),
('234567RJ', 'Dermatologia', 'Dra. Maria Oliveira', 'b4f6g7h8i9j0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', 'maria.oliveira@clinic.com'),
('345678MG', 'Neurologia', 'Dr. Pedro Souza', 'c5g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7', 'pedro.souza@clinic.com'),
('456789BA', 'Cardiologia', 'Dra. Ana Lima', 'd6h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8', 'ana.lima@clinic.com'),
('567890RS', 'Ortopedia', 'Dr. Carlos Mendes', 'e7i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9', 'carlos.mendes@clinic.com'),
('678901PR', 'Dermatologia', 'Dra. Fernanda Costa', 'f8j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0', 'fernanda.costa@clinic.com'),
('789012SC', 'Neurologia', 'Dr. Rafael Rocha', 'g9k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1', 'rafael.rocha@clinic.com'),
('890123PE', 'Cardiologia', 'Dra. Beatriz Lima', 'h0l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2', 'beatriz.lima@clinic.com'),
('901234CE', 'Ortopedia', 'Dr. Bruno Gomes', 'i1m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3', 'bruno.gomes@clinic.com'),
('012345DF', 'Dermatologia', 'Dra. Larissa Dias', 'j2n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4', 'larissa.dias@clinic.com');

INSERT INTO disponibilidade (id_disponibilidade, especialidade, data_disp, hora) VALUES
('DISP001', 'Cardiologia', '2025-07-01', '09:00:00'),
('DISP002', 'Dermatologia', '2025-07-01', '10:00:00'),
('DISP003', 'Neurologia', '2025-07-01', '11:00:00'),
('DISP004', 'Cardiologia', '2025-07-02', '09:00:00'),
('DISP005', 'Ortopedia', '2025-07-02', '10:30:00'),
('DISP006', 'Dermatologia', '2025-07-02', '14:00:00'),
('DISP007', 'Neurologia', '2025-07-03', '15:00:00'),
('DISP008', 'Cardiologia', '2025-07-03', '16:00:00'),
('DISP009', 'Ortopedia', '2025-07-04', '08:30:00'),
('DISP010', 'Dermatologia', '2025-07-04', '09:45:00');

select * from disponibilidade;
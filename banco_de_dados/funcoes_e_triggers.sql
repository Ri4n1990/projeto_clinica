
DELIMITER $$

CREATE TRIGGER exclue_disponibilidade
BEFORE DELETE 
ON disponibilidade
FOR EACH ROW
BEGIN

DELETE FROM registra WHERE id_disponibilidade = OLD.id_disponibilidade;



END $$



DELIMITER $$



DELIMITER $$

CREATE TRIGGER reserva_disponibilidade
AFTER INSERT 
ON consultas
FOR EACH ROW
BEGIN

DELETE FROM disponibilidade WHERE id_disponibilidade = NEW.id_consulta;

END $$
DELIMITER $$




INSERT INTO pacientes (cpf, nome, sexo, senha_de_acesso, email, data_nascimento)
VALUES (
    '123.456.789-00',
    'Carlos Mendes',
    'masculino',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', -- hash SHA-256 de exemplo
    'carlos.mendes@email.com',
    '1990-08-15'
);

-- Inserindo uma consulta
INSERT INTO consultas (id_consulta, crm_medico, cpf_paciente, data_consulta, hora)
VALUES (
    'DISP20250601A',
    '987654RJ',
    '123.456.789-00',
    '2025-06-03',
    '10:30:00'
);



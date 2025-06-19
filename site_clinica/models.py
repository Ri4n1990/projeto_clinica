from nucleo import bd
from sqlalchemy.dialects.mysql import CHAR

class Pacientes(bd.Model):
    __tablename__ = 'pacientes'

    cpf = bd.Column(bd.String(14),nullable = False, primary_key = True)
    nome = bd.Column(bd.String(85),nullable = False)
    sexo = bd.Column(bd.Enum('masculino','feminino'))
    senha_de_acesso = bd.Column(CHAR(64),nullable = False)
    email = bd.Column(bd.String(320),nullable = False)

    def __repr__(self):
        return f'[cpf : {self.cpf} , nome : {self.nome} , sexo : {self.sexo} , senha_de_acesso : {self.senha_de_acesso} , email : {self.email} ]'


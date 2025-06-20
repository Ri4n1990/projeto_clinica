from sqlalchemy.orm import backref

from nucleo import bd
from sqlalchemy.dialects.mysql import CHAR

class Pacientes(bd.Model):
    __tablename__ = 'pacientes'

    cpf = bd.Column(bd.String(14),nullable = False, primary_key = True)
    nome = bd.Column(bd.String(85),nullable = False)
    sexo = bd.Column(bd.Enum('masculino','feminino'))
    senha_de_acesso = bd.Column(CHAR(64),nullable = False)
    email = bd.Column(bd.String(320),nullable = False)
    endereco = bd.relationship("Endereco_Paciente", backref="paciente", uselist=False)
    telefone = bd.relationship("Telefone_Paciente",backref = "paciente", uselist = False)


    def __repr__(self):
        return f'[cpf : {self.cpf} , nome : {self.nome} , sexo : {self.sexo} , senha_de_acesso : {self.senha_de_acesso} , email : {self.email} ]'

class Endereco_Paciente(bd.Model):

    __tablename__ = 'endereco_paciente'

    cpf_paciente = bd.Column(bd.String(14), nullable = False, primary_key = True)
    cep = bd.Column(bd.Integer , bd.ForeignKey('pacientes.cpf'),nullable = False)
    rua = bd.Column(bd.String(50), nullable = False)
    bairro = bd.Column(bd.String(30), nullable = False)
    numero = bd.Column(bd.Integer, nullable = False)
    complemento = bd.Column(bd.Text, nullable = False)

    def __repr__(self):
        return  f'cpf_paciente : {self.cep} , cep : {self.cep} , rua : {self.rua} , bairro : {self.bairro} , numero : {self.numero} , complemento : {self.complemento}'



class Telefone_Paciente(bd.Model):
    __tablename__ = 'telefone_pacientes'

    cpf_paciente  = bd.Column(bd.String(14), bd.ForeignKey('pacientes.cpf'), primary_key = True , nullable = False)
    telefone = bd.Column(bd.String(14), nullable = False)

    def __str__(self):
        return  f'cpf : {self.cpf} , telefone : {self.telefone}'

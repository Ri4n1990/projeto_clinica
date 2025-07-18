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

    cpf_paciente = bd.Column(bd.String(14), bd.ForeignKey('pacientes.cpf'), nullable = False, primary_key = True)
    cep = bd.Column(bd.Integer ,nullable = False)
    rua = bd.Column(bd.String(50), nullable = False)
    bairro = bd.Column(bd.String(30), nullable = False)
    numero = bd.Column(bd.Integer, nullable = False)
    complemento = bd.Column(bd.Text, nullable = False)

    def __repr__(self):
        return  f' [ cpf_paciente : {self.cep} , cep : {self.cep} , rua : {self.rua} , bairro : {self.bairro} , numero : {self.numero} , complemento : {self.complemento} ]'



class Telefone_Paciente(bd.Model):
    __tablename__ = 'telefone_pacientes'

    cpf_paciente  = bd.Column(bd.String(14), bd.ForeignKey('pacientes.cpf'), primary_key = True , nullable = False)
    telefone = bd.Column(bd.String(14), nullable = False)

    def __str__(self):
        return  f'[ cpf : {self.cpf_paciente} , telefone : {self.telefone} ]'






class Disponibilidade(bd.Model):
    __tablename__ = 'disponibilidade'

    id_disponibilidade = bd.Column(bd.String(16), bd.ForeignKey('registra') , nullable = False, primary_key = True)
    especialidade = bd.Column(bd.String(30), nullable = False)
    data_disp = bd.Column(bd.Date, nullable = False)
    hora = bd.Column(bd.Time, nullable = False)

    def __str__(self):
        return f'[ id_disponibilidade : {self.id_disponibilidade} , especialidade : {self.especialidade} , data_disp : {self.data_disp} , hora : {self.hora} ]'


class Registra(bd.Model):

    __tablename__ = 'registra'

    id_registro = bd.Column(bd.String(16), nullable = False , primary_key = True)
    crm_medico = bd.Column(bd.String(10), bd.ForeignKey("medicos.crm"), nullable = False)
    id_disponibilidade = bd.Column(bd.String(16), bd.ForeignKey('disponibilidade.id_disponibilidade'))

    medico = bd.relationship('Medicos', backref = "registra",  foreign_keys=[crm_medico])
    disponibilidade = bd.relationship('Disponibilidade', backref = 'registra',  foreign_keys=[id_disponibilidade])

    def __str__(self):
        return  f'[ id_registro : {self.id_registro} , crm_medico : {self.crm_medico} id_disponibilidade : {self.id_disponibilidade} ]'



class Medicos(bd.Model):
    __tablename__ = 'medicos'

    crm = bd.Column(bd.String(10), bd.ForeignKey('registra.crm_medico'), nullable = False, primary_key = True)
    especialidade = bd.Column(bd.String(30), nullable = False)
    nome = bd.Column(bd.String(85), nullable = False)
    senha_de_acesso = bd.Column(CHAR(64), nullable = False)
    email = bd.Column(bd.String(320) , nullable = False)


    def __str__(self):
        return f'[ crm : {self.crm} , especialidade : {self.especialidade} , nome : {self.nome} , senha_de_acesso : {self.senha_de_acesso} , email : {self.email} ]'


class Consultas(bd.Model):
    __tablename__ = 'consultas'

    id_consulta = bd.Column(bd.String(16),  nullable = False, primary_key = True)
    crm_medico = bd.Column(bd.String(10), bd.ForeignKey('medicos.crm'), nullable = False)
    cpf_paciente = bd.Column(bd.String(14), bd.ForeignKey('pacientes.cpf'), nullable = False)
    data_consulta = bd.Column(bd.Date, nullable = False)
    hora = bd.Column(bd.Time, nullable = False )
    bd.relationship('Medicos', backref = 'consultas', foreign_keys = [crm_medico])
    bd.relationship('Pacientes', backref = 'consultas', foreign_keys = [cpf_paciente])


    def __str__(self):
        return f'[ id_consulta : {self.id_consulta} , crm_medico : {self.crm_medico} , cpf_paciente : {self.cpf_paciente} , data_consulta : {self.data_consulta} , hora : {self.hora}]'

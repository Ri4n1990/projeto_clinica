import json

from nucleo import app
from nucleo import bd
from  models import Pacientes , Endereco_Paciente, Telefone_Paciente
from sqlalchemy.orm.exc import NoResultFound
from flask import request, render_template, url_for, redirect ,jsonify , session
import  hashlib

app.secret_key = 'Y2hhdmVfc2Vzc2lvbg=='


@app.route('/')
def pagina_inicial():
    print(session.get('usuario'))
    if 'usuario' in session:
        try:
            dados = bd.session.query(Pacientes).filter(Pacientes.cpf == session['usuario']).one()
            return f'Bem vindo {dados.nome}!'
        except NoResultFound:
            return f'Bem vindo'



    return 'Bem vindo!'


@app.route('/pagina_login')
def pagina_login():
    return  render_template('pagina_login.html')


@app.route('/login_cliente',methods= ['POST'])
def login_cliente():

    dados = request.get_json()

    cpf = dados.get('cpf_cliente')
    senha = dados.get('senha_paciente')


    hash_senha = hashlib.sha256(senha.encode()).hexdigest()
    try:
        resultado = bd.session.query(Pacientes).filter(Pacientes.cpf == cpf).one()
        if hash_senha == resultado.senha_de_acesso:
            session['usuario'] = resultado.cpf
            return jsonify({'status':'ok'})
        else:
            resposta = {'erro':'Senha ou cpf incorretos!'}
            resposta = json.dumps(resposta)
            return resposta


    except NoResultFound:
        resposta = {'erro': 'o seu CPF não esta cadastrado!'}
        resposta = json.dumps(resposta)
        return resposta

@app.route('/pagina_cadastro')
def pagina_cadastro():
    return  render_template('pagina_cadastro_cliente.html')

@app.route('/cadastro_cliente', methods = ['POST'])
def cadastro_cliente():
    dados = request.get_json()
    try:
        verificacao = bd.session.query(Pacientes).filter(Pacientes.cpf == dados.get('cpf')).one()
        return  jsonify({'existente' : 'Você Já possui Cadastro!'})

    except NoResultFound:
        try:
            senha = dados.get('senha')
            senha = hashlib.sha256(senha.encode()).hexdigest()

            novo_paciente = Pacientes(cpf=dados.get('cpf'), nome=dados.get('nome'), sexo=dados.get('sexo'), senha_de_acesso=senha, email=dados.get('email'), )
            novo_endereco = Endereco_Paciente(cpf_paciente=dados.get('cpf'), cep=dados.get('cep'), rua=dados.get('rua'),bairro=dados.get('bairro'), numero=dados.get('numero'), complemento=dados.get('complemento'))
            novo_telefone = Telefone_Paciente(cpf_paciente=dados.get('cpf'), telefone=dados.get('telefone'))
            bd.session.add(novo_paciente)
            bd.session.add(novo_endereco)
            bd.session.add(novo_telefone)
            bd.session.commit()
            return jsonify({'status': 'ok'})

        except Exception as erro:
            bd.session.rollback()
            print(erro)
            return jsonify({'erro': 'Algo saiu Errado por favor tente novamente!'})


@app.route('/pagina_agendamentos')
def pagina_agendamentos():
    return render_template('pagina_agendamentos.html')












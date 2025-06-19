import json

from nucleo import app
from nucleo import bd
from  models import Pacientes
from sqlalchemy.orm.exc import NoResultFound
from flask import request, render_template, url_for, redirect ,jsonify
import  hashlib

@app.route('/')
def pagina_inicial():
    return 'Página inicial'

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
            return jsonify({'status':'ok','endpoint':'http://127.0.0.1:8080/'})
        else:
            resposta = {'erro':'Senha ou cpf incorretos!'}
            resposta = json.dumps(resposta)
            return resposta


    except NoResultFound:
        resposta = {'erro': 'o seu CPF não esta cadastrado!'}
        resposta = json.dumps(resposta)
        return resposta




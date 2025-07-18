import json

from nucleo import app
from nucleo import bd
from  models import Pacientes , Endereco_Paciente, Telefone_Paciente , Disponibilidade , Registra, Medicos, Consultas
from sqlalchemy.orm.exc import NoResultFound
from flask import request, render_template, url_for, redirect ,jsonify , session
import  hashlib

app.secret_key = 'Y2hhdmVfc2Vzc2lvbg=='



@app.route('/')
def pagina_inicial():

    if 'usuario' in session:
        try:
            dados = bd.session.query(Pacientes).filter(Pacientes.cpf == session['usuario']).one()
            return render_template('pagina_inicial.html', template = 'template_logado.html')
        except NoResultFound:
            return  render_template('pagina_inicial.html', template = 'template_nao_logado.html')
    return render_template('pagina_inicial.html', template='template_nao_logado.html')




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
            return jsonify({'erro': 'Algo saiu Errado por favor tente novamente!'})


@app.route('/pagina_agendamentos')
def pagina_agendamentos():

    template_include = 'template_logado.html' if 'usuario' in session else 'template_nao_logado.html'
    pagina = 'pagina_agendamentos.html' if 'usuario' in session else 'pagina_agendamentos_nao_logado.html'

    if 'usuario' in session:
        dados_paciente = bd.session.query(Pacientes).filter(Pacientes.cpf == session.get('usuario')).join(Telefone_Paciente,Telefone_Paciente.cpf_paciente == Pacientes.cpf)\
        .with_entities(

            Pacientes.nome,
            Pacientes.email,
            Telefone_Paciente.telefone,
            Pacientes.cpf


        ).one()


        return render_template(pagina, titulo='Agendamentos', template=template_include, dados_paciente = dados_paciente)

    return render_template(pagina, titulo='Agendamentos', template=template_include,msg = 'Faça login para realizar um agendamento')


@app.route('/disponibilidades',methods = ['POST'])
def disponibilidades_consulta():
    dados = request.get_json()
    retorno = bd.session.execute(bd.text(f'select  date_format(data_disp,"%d") from disponibilidade where date_format(data_disp,"%m") = {dados.get("mes")} and especialidade = "{dados.get("especialidade")}" and date_format(data_disp,"%Y") = {dados.get("ano")};'))
    dias_disponiveis = []
    for r in retorno:
        dias_disponiveis.append(r[0]) if r[0] not in dias_disponiveis else None

    return  jsonify({'dias': dias_disponiveis})


@app.route('/info_datas',methods = ['POST'])
def info_datas():
    dados = request.get_json()
    print(dados.get('especialidade'))
    data = f'{dados.get("ano")}-{dados.get("mes")}-{dados.get("dia")}'
    print(data)

    disponibilidade = bd.session.query(Disponibilidade).filter(Disponibilidade.data_disp == f'{data}').join(
        Registra, Registra.id_disponibilidade == Disponibilidade.id_disponibilidade).join(Medicos,Registra.crm_medico == Medicos.crm) \
        .filter(Medicos.especialidade == dados.get('especialidade') ).with_entities(

        Medicos.nome,
        Disponibilidade.hora

    ).order_by(Disponibilidade.hora).all()
    resposta = {}

    for e in disponibilidade:
        if e.nome not in resposta:
            resposta[e.nome] = []

        resposta[e.nome].append(e.hora.strftime("%H:%M"))

    return  jsonify(resposta)






@app.route('/agendar',methods = ['POST'])
def agendar_consulta():
    try:


        demanda =  request.get_json()
        print(demanda.get('data'))
        print(demanda.get('hora'))

        dados_consulta = bd.session.query(Medicos).join(Registra, Medicos.crm == Registra.crm_medico).join(Disponibilidade, Registra.id_disponibilidade == Disponibilidade.id_disponibilidade)\
        .filter(Medicos.nome == demanda.get("nome"),Medicos.especialidade == demanda.get('especialidade'), Disponibilidade.data_disp == demanda.get('data'),
                Disponibilidade.hora == demanda.get('hora'))\
        .with_entities(

            Medicos.crm,
            Disponibilidade.id_disponibilidade



        ).one()

        crm_medico = dados_consulta.crm
        id_disponibilidade = dados_consulta.id_disponibilidade
        cpf_paciente = session['usuario']
        data = demanda.get('data')
        hora = demanda.get('hora')

    except Exception as erro:
        print(erro)

    try:
        nova_consulta = Consultas(id_consulta = id_disponibilidade, crm_medico = crm_medico, cpf_paciente = cpf_paciente,
                                  data_consulta = data , hora = hora)
        bd.session.add(nova_consulta)
        bd.session.commit()

        return  jsonify({'operacao' : True})


    except Exception as erro:
        bd.session.rollback()
        return jsonify({'operacao': False})


@app.route('/consultas')
def consultas():




    include_template = 'template_logado.html' if 'usuario' in session else 'template_nao_logado.html'
    pagina = 'pagina_consultas.html' if 'usuario' in session  else 'pagina_consultas_nao_logado.html'

    if 'usuario' in session:

        try:
            consultas_paciente = bd.session.query(Consultas).join(Medicos, Consultas.crm_medico == Medicos.crm).filter(
                Consultas.cpf_paciente == session['usuario']) \
                .with_entities(
                Medicos.nome,
                Medicos.especialidade,
                Consultas.data_consulta,
                Consultas.hora,
                Consultas.id_consulta
            ).all()

            if consultas_paciente == []:
                return render_template('sem_consultas.html', template=include_template, msg='Você não possui Consultas Agendadas')


            return render_template(pagina,template=include_template, consultas_paciente = consultas_paciente)

        except NoResultFound:
            print('bom')








    return  render_template(pagina, msg = 'Faça login para visualizar os seus agendamentos', template = include_template)


@app.route('/desmarcar_consulta/<string:id>', methods = ['POST'])
def desmarcar_consulta(id):
    try:
        bd.session.query(Consultas).filter(Consultas.id_consulta == id).delete()
        bd.session.commit()
        return jsonify({'execucao':True})
    except Exception as erro:
        bd.session.rollback()
        print(f'Erro ao executar a query! {erro}')
        return jsonify({'execucao': False})


@app.route('/pagina_edicao')
def pagina_edicao():
    if 'usuario' not in session:
        return  redirect(url_for('pagina_inicial'))
    dados_paciente = bd.session.query(Pacientes).filter(Pacientes.cpf == session['usuario']).one()
    tel_paciente = bd.session.query(Telefone_Paciente).filter(Telefone_Paciente.cpf_paciente == session['usuario'] ).one()
    endereco_paciente = bd.session.query(Endereco_Paciente).filter(Endereco_Paciente.cpf_paciente == session['usuario']).one()
    return  render_template('pagina_edicao_cliente.html', dados_paciente = dados_paciente , endereco = endereco_paciente, telefone = tel_paciente.telefone)

@app.route('/edicao_cliente',methods = ['POST'])
def edicao_cliente():
    try:
        dados = request.get_json()
        tel_paciente = bd.session.query(Telefone_Paciente).filter(
            Telefone_Paciente.cpf_paciente == session['usuario']).one()
        endereco_paciente = bd.session.query(Endereco_Paciente).filter(
            Endereco_Paciente.cpf_paciente == session['usuario']).one()

        dados_paciente = bd.session.query(Pacientes).filter(Pacientes.cpf == session['usuario']).one()
        dados_paciente.nome = dados.get('nome')
        dados_paciente.cpf = dados.get('cpf')
        dados_paciente.email = dados.get('email')
        dados_paciente.sexo = dados.get('sexo')
        tel_paciente.telefone = dados.get('telefone')
        endereco_paciente.cep = dados.get('cep')
        endereco_paciente.rua = dados.get('rua')
        endereco_paciente.bairro = dados.get('bairro')
        endereco_paciente.numero = dados.get('numero')
        endereco_paciente.complemento = dados.get('complemento')
        bd.session.commit()
        return  jsonify({'status' : True})
    except Exception as erro:
        print(f'erro ao executar query {erro}')
        return jsonify({'erro': True})


@app.route('/logout')
def logout():
    session.pop('usuario')
    return  redirect(url_for('pagina_inicial'))
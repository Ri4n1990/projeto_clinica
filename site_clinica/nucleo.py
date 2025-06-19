from flask import  Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import  os

paginas = os.path.abspath('paginas')
estaticos = os.path.abspath('estaticos')

app = Flask(__name__,template_folder=paginas,static_folder=estaticos)

USERNAME = 'root'
SENHA = 'M%40gnus1990'
HOST = 'localhost'
BANCO = 'clinica'
var_bd = 'SQLALCHEMY_DATABASE_URI'


app.config[var_bd] = f'mysql+mysqlconnector://{USERNAME}:{SENHA}@{HOST}/{BANCO}'

try:
    conexao = create_engine(app.config[var_bd])
    conexao.connect()
    print('Conexão do banco estabelecida com sucesso!')

except Exception as erro:
    print(f'Erro ao tentar se conectar com o banco! {erro}')


bd = SQLAlchemy(app)




from  rotas import *






if __name__ == "__main__":
    app.run(port=8080,debug=True)
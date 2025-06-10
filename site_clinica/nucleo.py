from flask import  Flask

import  os
paginas = os.path.abspath('paginas')
estaticos = os.path.abspath('estaticos')

app = Flask(__name__,template_folder=paginas,static_folder=estaticos)









if __name__ == "__main__":
    app.run(port=8080,debug=True)

const data_atual = new Date()
data_atual.setDate(1)

let corpo_tabela = document.getElementById('dias_do_mes')
let ano = document.getElementById('ano')
let mes = document.getElementById('mes')
const seta_anterior = document.getElementById('anterior')
const seta_posterior = document.getElementById('posterior')
const meses = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']


let especialidades = [...document.querySelectorAll('#especialidades>li')]

let especialidade_escolhida = null




function ultimo_dia_mes(ano,mes){

    return new Date(ano, mes + 1, 0).getDate()
}

function dias_anteriores(data){

    
    
    let  minha_data = new Date(data.getFullYear(),data.getMonth(),data.getDate())
    
  
    
    
    
    if(minha_data.getDay() != 0){
        let dias_mes_passado = []
        let ultimo_dia_mes_passado = ultimo_dia_mes(minha_data.getFullYear(),minha_data.getMonth()-1)
        minha_data.setMonth(data.getMonth()-1)
        minha_data.setDate(ultimo_dia_mes_passado)


        while(minha_data.getDay() >= 0){

            if(minha_data.getDay() == 0){
                let td = document.createElement('td')
                td.classList.add('dias_indisponiveis')
                td.innerHTML = minha_data.getDate()
                dias_mes_passado.push(td)
                dias_mes_passado.reverse()
                dias_mes_passado.map((e)=>{
                    dias_mes.push(e)

                })
                break
            }
            
            let td = document.createElement('td')
            td.innerHTML = minha_data.getDate()

            dias_mes_passado.push(td)
            minha_data.setDate(minha_data.getDate()-1)

          
            

        }
        return
        
    }
    return
    

}

function dias_posteriores(data){

    
    let  minha_data = new Date(data.getFullYear(),data.getMonth(),data.getDate())

    minha_data.setDate(ultimo_dia_mes(minha_data.getFullYear(),minha_data.getMonth()))
    

    if(minha_data.getDay()!=6){
        minha_data.setDate(1)
        minha_data.setMonth(minha_data.getMonth()+ 1)
        let i = 1
        while(minha_data.getDay() <= 6){

            if(minha_data.getDay() == 6){

                let td = document.createElement('td')
                td.classList.add('dias_indisponiveis')
                td.innerHTML = i <10 ? '0'+ i : i
                dias_mes.push(td)
                break
            }


            let td = document.createElement('td')
            td.classList.add('dias_indisponiveis')
            td.innerHTML = minha_data.getDate() <10 ? '0'+minha_data.getDate() : minha_data.getDate()
            dias_mes.push(td)
            i++
            minha_data.setDate(i)
            
            

            
        
            
        }
        

    }return
}


async function dias_do_mes(data){
    let ultimo_dia = ultimo_dia_mes(data.getFullYear(),data.getMonth())
    let mes_atual = data.getMonth()+1
    
    let dados = {'especialidade': especialidade_escolhida,'mes':mes_atual, 'ano': data.getFullYear()}
    const edpoint = 'http://127.0.0.1:8080/disponibilidades'

    
    

    let cabecalho = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }

    let dias_disponiveis = await fetch(edpoint,cabecalho).then(resp => resp.json()).then(resposta =>{
        
        return resposta.dias
        


    })

    

    if(dias_disponiveis.length == 0){
        for(let x = 1; x<= ultimo_dia; x++){
            let td = document.createElement('td')
            td.innerHTML = x <10 ? '0'+ x : x
           dias_mes.push(td)
        


    }}else{
        
        

        for(let x = 1; x<= ultimo_dia; x++){
            let td = document.createElement('td')
            td.innerHTML = x <10 ? '0'+ x : x
            dias_disponiveis.map((e)=>{
                td.innerHTML === e ? td.classList.add('disponivel') : null

            })
            
            dias_mes.push(td)



    }

    
    



    
       
   }
    
    
    

   

}


function cria_calendario(){

    dias_mes.map((e)=>{

        elementos.push(e)
        cont++
    
        if(cont == 7){
            let tr = document.createElement('tr')
            elementos.map((v)=>{
                tr.appendChild(v)
                
    
            })
            
            corpo_tabela.appendChild(tr)
            cont = 0
            elementos = []
                
        }else if(e == dias_mes[dias_mes.length-1]){
            let tr = document.createElement('tr')
            elementos.map((v)=>{
                tr.appendChild(v)
                
                
    
        })
        corpo_tabela.appendChild(tr)
        
        }
    
    
    
    
    
    
    
    })

}

function dia_selecionado(){
    let dia_disponivel = [...document.getElementsByClassName('disponivel')]
    dia_disponivel.map((e)=>{
        e.addEventListener('click',()=>{
            let dia_selecionado = document.getElementById('dia_selecionado')
            if(dia_selecionado != null){
                dia_selecionado.removeAttribute('id')

            }
            e.id = 'dia_selecionado'
        })
    })
}

function horario_selecionado(){
    let hora_disponivel = [...document.getElementsByClassName('hora_disponivel')]
    
    hora_disponivel.map((e)=>{
        
        e.addEventListener('click',()=>{
            let hora_selecionada = document.getElementById('horario_selecionado')
            if(hora_selecionada != null){
                
                hora_selecionada.removeAttribute('id')

            }
            
            e.id = 'horario_selecionado'
        })
    })
}

function limpa_horarios(){
    let disponibilidade = document.getElementById('disponibilidade')
    let elementos_exist = [...disponibilidade.childNodes]
    

    if(elementos_exist.length >1){
        let dados_exist = [...document.getElementsByClassName('informacoes')]
        
        dados_exist.forEach(e => {
            e.remove()
            
        });
    }
}



let cont = 0
let elementos = []

let dias_mes = []



especialidades.map((e)=>{
    e.addEventListener('click', async (evt)=>{
        especialidade_escolhida = e.innerHTML
        tela_2.style = 'display:none;'
        tela_3.style = 'display:flex'
        let dias_existentes = [...document.getElementsByTagName('tr')]
        if(dias_existentes.length != 0){


            dias_existentes.map((e)=>{
                
                corpo_tabela.removeChild(e)

            })

            dias_mes = []

        } 

        dias_anteriores(data_atual)
        await dias_do_mes(data_atual)
        dias_posteriores(data_atual)
        ano.innerHTML = data_atual.getFullYear()
        mes.innerHTML = meses[data_atual.getMonth()]
        cria_calendario()
        dia_selecionado()

        
        

        let consultas_disponoveis = [...document.getElementsByClassName('disponivel')]
       
        consultas_disponoveis.map((e)=>{
            
            e.addEventListener('click',(evt)=>{
                
                

                let dados = {
                    dia: e.innerHTML,
                    ano: document.getElementById('ano').innerHTML,
                    mes: meses.indexOf(document.getElementById('mes').innerHTML)+1 < 10 ? `0${meses.indexOf(document.getElementById('mes').innerHTML)+1}` : meses.indexOf(document.getElementById('mes').innerHTML)+1,
                    especialidade : especialidade_escolhida
                    

                }

                let endpoint = "http://127.0.0.1:8080/info_datas"

                let cabecalho = {
                    method : 'POST',
                    headers : {"Content-Type" : "Application/json"},
                    body:    JSON.stringify(dados)

                }

                limpa_horarios()
                
                fetch(endpoint,cabecalho).then(resp => resp.json()).then(resposta =>{
                    let chaves = Object.keys(resposta)
                    let valores = Object.values(resposta)

                   console.log(resposta)
                    chaves.map((e,p)=>{
                        let div = document.createElement('div')
                        div.classList.add('informacoes')

                        let section = document.createElement('section')
                        section.classList.add('dados_medico')

                        let p_especialidade = document.createElement('p')
                        let p_nome_medico = document.createElement('p')
                        p_especialidade.id = 'especialidade_medico'
                        p_especialidade.innerHTML = especialidade_escolhida
                        p_nome_medico.innerHTML = e

                        section.appendChild(p_nome_medico)
                        section.appendChild(p_especialidade)
                        

                        let ul = document.createElement('ul')
                        ul.classList.add('horarios')

                        valores[p].map((v)=>{
                            let li = document.createElement('li')
                            li.classList.add('hora_disponivel')
                            li.innerHTML = v
                            ul.appendChild(li)
                            
                            
                        })
                        div.appendChild(section)
                        div.appendChild(ul)
                        disponibilidade.appendChild(div)
                        
                        
                    })

                    horario_selecionado()
                    
                })
                

            })
        })
        
    })
})

let agora  = data_atual
seta_posterior.addEventListener('click', async ()=>{

    limpa_horarios()

    let linhas_tabela = [...document.getElementsByTagName('tr')]
    linhas_tabela.map((e)=>{
        corpo_tabela.removeChild(e)
    })

    dias_mes = []
    agora.setDate(1)
    agora.setMonth(agora.getMonth()+1)
    dias_anteriores(agora)
    await dias_do_mes(agora)
    dias_posteriores(agora)
    cria_calendario()
    dia_selecionado()
    mes.innerHTML = meses[agora.getMonth()]
    ano.innerHTML = agora.getFullYear()

    let consultas_disponoveis = [...document.getElementsByClassName('disponivel')]
       
        consultas_disponoveis.map((e)=>{
            e.addEventListener('click',(evt)=>{
                

                let dados = {
                    dia: e.innerHTML,
                    ano: document.getElementById('ano').innerHTML,
                    mes: meses.indexOf(document.getElementById('mes').innerHTML)+1 < 10 ? `0${meses.indexOf(document.getElementById('mes').innerHTML)+1}` : meses.indexOf(document.getElementById('mes').innerHTML)+1,
                    especialidade  : especialidade_escolhida
                    

                }

                let endpoint = "http://127.0.0.1:8080/info_datas"

                let cabecalho = {
                    method : 'POST',
                    headers : {"Content-Type" : "Application/json"},
                    body:    JSON.stringify(dados)

                }

                limpa_horarios()
                
                fetch(endpoint,cabecalho).then(resp => resp.json()).then(resposta =>{
                    let chaves = Object.keys(resposta)
                    let valores = Object.values(resposta)

                   
                    chaves.map((e,p)=>{
                        let div = document.createElement('div')
                        div.classList.add('informacoes')

                        let section = document.createElement('section')
                        section.classList.add('dados_medico')

                        let p_especialidade = document.createElement('p')
                        let p_nome_medico = document.createElement('p')
                        p_especialidade.id = 'especialidade_medico'
                        
                        p_especialidade.innerHTML = especialidade_escolhida
                        p_nome_medico.innerHTML = e

                        section.appendChild(p_nome_medico)
                        section.appendChild(p_especialidade)
                        

                        let ul = document.createElement('ul')
                        ul.classList.add('horarios')

                        valores[p].map((v)=>{
                            let li = document.createElement('li')
                            li.classList.add('hora_disponivel')
                            li.innerHTML = v
                            ul.appendChild(li)
                            
                            
                        })
                        div.appendChild(section)
                        div.appendChild(ul)
                        disponibilidade.appendChild(div)
                        
                        

                    })
                    horario_selecionado()
                })

            })
        })





    

    
})

    
seta_anterior.addEventListener('click', async()=>{
    
    limpa_horarios()

    let mes_atras = new Date()
    mes_atras.setMonth(agora.getMonth()-1)
    mes_atras.setDate(1)
    mes_atras.setFullYear(agora.getFullYear())
    let hoje = new Date()
    hoje.setDate(1)
    if(mes_atras < hoje){
        
        
        return
    }

    let linhas_tabela = [...document.getElementsByTagName('tr')]
    linhas_tabela.map((e)=>{
        corpo_tabela.removeChild(e)
    })

    dias_mes = []
    agora.setDate(1)
    agora.setMonth(agora.getMonth()-1)
    dias_anteriores(agora)
    await dias_do_mes(agora)
    dias_posteriores(agora)
    cria_calendario()
    dia_selecionado()
    mes.innerHTML = meses[agora.getMonth()]
    ano.innerHTML = agora.getFullYear()


    let consultas_disponoveis = [...document.getElementsByClassName('disponivel')]
       
        consultas_disponoveis.map((e)=>{
            e.addEventListener('click',(evt)=>{
                

                let dados = {
                    dia: e.innerHTML,
                    ano: document.getElementById('ano').innerHTML,
                    mes: meses.indexOf(document.getElementById('mes').innerHTML)+1 < 10 ? `0${meses.indexOf(document.getElementById('mes').innerHTML)+1}` : meses.indexOf(document.getElementById('mes').innerHTML)+1,
                    especialidade  : especialidade_escolhida
                    

                }

                let endpoint = "http://127.0.0.1:8080/info_datas"

                let cabecalho = {
                    method : 'POST',
                    headers : {"Content-Type" : "Application/json"},
                    body:    JSON.stringify(dados)

                }

                limpa_horarios()
                
                fetch(endpoint,cabecalho).then(resp => resp.json()).then(resposta =>{
                    let chaves = Object.keys(resposta)
                    let valores = Object.values(resposta)

                   
                    chaves.map((e,p)=>{
                        let div = document.createElement('div')
                        div.classList.add('informacoes')

                        let section = document.createElement('section')
                        section.classList.add('dados_medico')

                        let p_especialidade = document.createElement('p')
                        let p_nome_medico = document.createElement('p')
                        p_especialidade.id = 'especialidade_medico'
                        p_especialidade.innerHTML = especialidade_escolhida
                        p_nome_medico.innerHTML = e

                        section.appendChild(p_nome_medico)
                        section.appendChild(p_especialidade)
                        

                        let ul = document.createElement('ul')
                        ul.classList.add('horarios')

                        valores[p].map((v)=>{
                            let li = document.createElement('li')
                            li.classList.add('hora_disponivel')
                            li.innerHTML = v
                            ul.appendChild(li)
                            
                            
                        })
                        div.appendChild(section)
                        div.appendChild(ul)
                        disponibilidade.appendChild(div)
                        
                        

                    })
                    horario_selecionado()
                })

            })
        })
    })

    
        








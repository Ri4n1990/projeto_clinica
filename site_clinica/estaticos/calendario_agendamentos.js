const data_atual = new Date()
data_atual.setDate(1)

let corpo_tabela = document.getElementById('dias_do_mes')
let ano = document.getElementById('ano')
let mes = document.getElementById('mes')
const seta_anterior = document.getElementById('anterior')
const seta_posterior = document.getElementById('posterior')
const meses = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']



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
                td.innerHTML = i <10 ? '0'+ i : i
                dias_mes.push(td)
                break
            }


            let td = document.createElement('td')
            td.innerHTML = minha_data.getDate() <10 ? '0'+minha_data.getDate() : minha_data.getDate()
            dias_mes.push(td)
            i++
            minha_data.setDate(i)
            
            

            
        
            
        }
        

    }return
}


function dias_do_mes(data){

    
    let ultimo_dia = ultimo_dia_mes(data.getFullYear(),data.getMonth())

    
    for(let x = 1; x<= ultimo_dia; x++){
         let td = document.createElement('td')
         td.innerHTML = x <10 ? '0'+ x : x
        dias_mes.push(td)
        
    }

    return dias_mes

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




let cont = 0
let elementos = []

let dias_mes = []


dias_anteriores(data_atual)
dias_do_mes(data_atual)
dias_posteriores(data_atual)
ano.innerHTML = data_atual.getFullYear()
mes.innerHTML = meses[data_atual.getMonth()]
cria_calendario()


let agora  = data_atual
seta_posterior.addEventListener('click',()=>{
    let linhas_tabela = [...document.getElementsByTagName('tr')]
    linhas_tabela.map((e)=>{
        corpo_tabela.removeChild(e)
    })

    dias_mes = []
    agora.setDate(1)
    agora.setMonth(agora.getMonth()+1)
    dias_anteriores(agora)
    dias_do_mes(agora)
    dias_posteriores(agora)
    cria_calendario()
    mes.innerHTML = meses[agora.getMonth()]
    ano.innerHTML = agora.getFullYear()
    
    





    

    
})

    
seta_anterior.addEventListener('click',()=>{
    
    
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
    dias_do_mes(agora)
    dias_posteriores(agora)
    cria_calendario()
    mes.innerHTML = meses[agora.getMonth()]
    ano.innerHTML = agora.getFullYear()
    
    
})

    
        








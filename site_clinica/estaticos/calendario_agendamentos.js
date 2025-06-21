const data = new Date()
let ano_atual = data.getFullYear()
let mes_atual = data.getMonth()
let ultimo_dia = ultimo_dia_mes(ano_atual,mes_atual)
let corpo_tabela = document.getElementById('dias_do_mes')

const meses = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

let dias_mes = []


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
            
            let tr = document.createElement('tr')
            tr.innerHTML = minha_data.getDate()

            dias_mes_passado.push(tr)
            minha_data.setDate(minha_data.getDate()-1)

            if(minha_data.getDay() == 0){
                let tr = document.createElement('tr')
                tr.innerHTML = minha_data.getDate()
                dias_mes_passado.push(tr)
                dias_mes_passado.reverse()
                dias_mes_passado.map((e)=>{
                    dias_mes.push(e)

                })
                break
            }
            

        }
        return
        
    }
    return
    

}

function dias_posteriores(data){
    
    let  minha_data = new Date(data.getFullYear(),data.getMonth(),data.getDate())

    minha_data.setDate(ultimo_dia_mes(minha_data.getFullYear(),minha_data.getMonth()))

    if(minha_data.getDay()!=0){
        
        minha_data.setMonth(minha_data.getMonth()+ 1)
        minha_data.setDate(1)
        let i = 1
        while(minha_data.getDay() <= 6){
            let tr = document.createElement('tr')
            tr.innerHTML = i
            dias_mes.push(tr)
            i++
            minha_data.setDate(i)
            

            if(minha_data.getDay() == 6){

                let tr = document.createElement('tr')
                tr.innerHTML = i
                dias_mes.push(tr)
                break
            }
        
            
        }
        

    }return
}


function dias_do_mes(ano,mes){
    let ultimo_dia = ultimo_dia_mes(ano,mes)

    
    for(let x = 1; x<= ultimo_dia; x++){
         let tr = document.createElement('tr')
         tr.innerHTML = x
        dias_mes.push(tr)
        
    }

    return dias_mes

}





dias_anteriores(data)
dias_do_mes(ano_atual,mes_atual)
dias_posteriores(data)





// aqui !!!!!!!

// let cont = 0
// let elementos = []
// dias_mes.map((e)=>{

//     let td = document.createElement('td')
//     elementos.push(td)
//     cont++

//     if(cont == 7){
//         let tr  = document.createElement('tr')
//         elementos.map(()=>{
//             tr.appendChild(v)

//         })
            
//         }
//         corpo_tabela.appendChild(tr)
//         cont = 0


//     }
        



// })




let btn_confirma_tela_1 = document.getElementById('confirma')
let btn_voltar_tela_2 = document.getElementById('btn_voltar')
let btn_voltar_tela3 = document.getElementById('btn_voltar_tela3')
let btn_agendar = document.getElementById('btn_agendar')
let disponiveis = [...document.getElementsByClassName('disponivel')]
let tela_1 = document.getElementById('tela_1')
let tela_2 = document.getElementById('tela_2')
let tela_3 = document.getElementById('tela_3')
let tela_4 = document.getElementById('tela_4')
const meses = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']


let data_consulta = null
let nome_medico = null
let especialidade = null
let horario = null


btn_confirma_tela_1.addEventListener('click',()=>{
    tela_1.style = 'display:none;'
    tela_2.style = 'display:flex;'
})

btn_voltar_tela_2.addEventListener('click',()=>{
    tela_2.style = 'display:none;'
    tela_1.style = 'display:flex;'

})



btn_voltar_tela3.addEventListener('click',()=>{

    let disponibilidade = document.getElementById('disponibilidade')
    let elementos_exist = [...disponibilidade.childNodes]
                

    if(elementos_exist.length >1){
        let dados_exist = [...document.getElementsByClassName('informacoes')]
        
        dados_exist.forEach(e => {
            e.remove()
            
        });
    }


    tela_3.style = 'display:none;'
    tela_2.style = 'display:flex'

})



btn_agendar.addEventListener('click',()=>{

    let dia_selecionado = document.getElementById('dia_selecionado')
    let horario_selecionado = document.getElementById('horario_selecionado')

    if(dia_selecionado == null || horario_selecionado == null){
        alert('Selecione Um Dia e horário para a consulta!')
        return
        
        
    }

    let mes = meses.indexOf(document.getElementById('mes').innerHTML) < 10 ? `0${meses.indexOf(document.getElementById('mes').innerHTML)}` : meses.indexOf(document.getElementById('mes').innerHTML)

    data_consulta = `${document.getElementById('dia_selecionado').innerHTML}/${mes}/${document.getElementById('ano').innerHTML}`

    horario = document.getElementById('horario_selecionado').innerHTML

    especialidade = document.getElementById('especialidade_medico').innerHTML
    nome_medico = document.getElementById('nome_profissional').innerHTML

    tela_3.style = 'display:none'
    tela_4.style = 'display:flex'
    
    
    

})


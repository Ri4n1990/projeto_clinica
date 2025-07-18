let btn_confirma_tela_1 = document.getElementById('confirma')
let btn_voltar_tela_2 = document.getElementById('btn_voltar')
let btn_voltar_tela3 = document.getElementById('btn_voltar_tela3')
let btn_voltar_tela4 = document.getElementById('btn_voltar_tela4')
let btn_agendar = document.getElementById('btn_agendar')
let confirma_consulta = document.getElementById('confirma_consulta')
let btn_fecha_modal_erro = document.getElementById('confirma')
let modal_ok = document.getElementById('sucesso')
let modal_erro = document.getElementById('excecao')
let btn_pagina_inicial = document.getElementById('btn_confirma')
let disponiveis = [...document.getElementsByClassName('disponivel')]



let tela_1 = document.getElementById('tela_1')
let tela_2 = document.getElementById('tela_2')
let tela_3 = document.getElementById('tela_3')
let tela_4 = document.getElementById('tela_4')
const meses = ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

let hora = document.getElementById('hora')
let data = document.getElementById('data')
let nome_doutor = document.getElementById('nome_medico')
let especialidade_medico = document.getElementById('especialidade_medico')

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


btn_voltar_tela4.addEventListener('click',()=>{

    tela_4.style = 'display:none;'
    tela_3.style = 'display:flex;'
})

btn_agendar.addEventListener('click',()=>{

    let dia_selecionado = document.getElementById('dia_selecionado')
    let horario_selecionado = document.getElementById('horario_selecionado')

    if(dia_selecionado == null || horario_selecionado == null){
        alert('Selecione Um Dia e horário para a consulta!')
        return
        
        
    }

    let mes = meses.indexOf(document.getElementById('mes').innerHTML)+1 < 10 ? `0${meses.indexOf(document.getElementById('mes').innerHTML)+1}` : meses.indexOf(document.getElementById('mes').innerHTML)+1

    data.innerHTML = `${document.getElementById('dia_selecionado').innerHTML}/${mes}/${document.getElementById('ano').innerHTML}`
    hora.innerHTML = document.getElementById('horario_selecionado').innerHTML
    especialidade_medico.innerHTML = document.getElementById('especialidade_medico').innerHTML
    
    nome_doutor.innerHTML = document.getElementById('horario_selecionado').parentElement.previousSibling.firstChild.innerHTML


    tela_3.style = 'display:none'
    tela_4.style = 'display:flex'
    
    
    

})



btn_fecha_modal_erro.addEventListener('click',()=>{

    modal_erro.close()
})


btn_pagina_inicial.addEventListener('click',()=>{
    window.location.href = '/'
})
confirma_consulta.addEventListener('click', async () => {

    let mes = meses.indexOf(document.getElementById('mes').innerHTML) + 1;
    mes = mes < 10 ? `0${mes}` : mes;
  
    let dados = {
      data: `${document.getElementById('ano').innerHTML}-${mes}-${document.getElementById('dia_selecionado').innerHTML}`,
      hora: `${hora.innerHTML}:00`,
      nome: nome_doutor.innerHTML,
      especialidade: especialidade_medico.innerHTML,
    };
    console.log(dados)
  
    let cabecalho = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    };
  
    let endpoint = 'http://127.0.0.1:8080/agendar';
  
    fetch(endpoint, cabecalho)
      .then((resp) => {
        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        return resp.json();
      })
      .then((resposta) => {
        if (resposta.operacao === true) {
          modal_ok.showModal();
        } else {
          modal_erro.showModal();
        }
      })
      .catch((erro) => {
        console.error('Erro na requisição:', erro);
        modal_erro.showModal();
      });
  });
  
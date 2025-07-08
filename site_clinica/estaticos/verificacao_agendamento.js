let btn_confirma_tela_1 = document.getElementById('confirma')
let btn_voltar_tela_2 = document.getElementById('btn_voltar')
let btn_voltar_tela3 = document.getElementById('btn_voltar_tela3')
let disponiveis = [...document.getElementsByClassName('disponivel')]
let tela_1 = document.getElementById('tela_1')
let tela_2 = document.getElementById('tela_2')
let tela_3 = document.getElementById('tela_3')

btn_confirma_tela_1.addEventListener('click',()=>{
    tela_1.style = 'display:none;'
    tela_2.style = 'display:flex;'
})

btn_voltar_tela_2.addEventListener('click',()=>{
    tela_2.style = 'display:none;'
    tela_1.style = 'display:flex;'

})



btn_voltar_tela3.addEventListener('click',()=>{
    tela_3.style = 'display:none;'
    tela_2.style = 'display:flex'

})




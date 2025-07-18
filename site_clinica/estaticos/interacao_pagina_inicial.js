let btn_seta = [...document.getElementsByClassName('btn_seta')]
let icone_usuario = document.getElementById('icone_usuario')
let menu_user = document.getElementById('menu_user')
console.log(icone_usuario,menu_user)
btn_seta.map((e)=>{

    e.addEventListener('click',()=>{
        let pai = e.parentElement
        let descricao = pai.nextElementSibling
        descricao.classList.toggle('nao_visivel')
        e.classList.toggle('btn_seta')
        e.classList.toggle('btn_seta_visivel')
    })


})

icone_usuario.addEventListener('click',()=>{
    
    menu_user.classList.toggle('menu_user_visivel')
})
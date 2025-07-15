let btn_deletar = [...document.getElementsByClassName('desmarcar')]
let modal_desmarcar = document.getElementById('modal_desmarcar')
let voltar_desmarcar = document.getElementById('voltar_desmarcar')
let confirma = document.getElementById('confirma')
let sucesso_desmarcar = document.getElementById('sucesso_desmarcar')
let erro_desmarcar = document.getElementById('erro_desmarcar')
let ok_modal = [...document.getElementsByClassName('ok_modal')]


let id_consulta = null
btn_deletar.map((e)=>{
    
    e.addEventListener('click',()=>{
        modal_desmarcar.showModal()
        let input = e.nextElementSibling
        id_consulta = input.value

           
        
    })

})

confirma.addEventListener('click',()=>{
    const endpoint = `http://127.0.0.1:8080/desmarcar_consulta/${id_consulta}`
        fetch(endpoint, {method: 'POST'}).then(resp => resp.json()).then(resposta=>{


            resposta.execucao ? sucesso_desmarcar.showModal() : erro_desmarcar.showModal()

        })

})

voltar_desmarcar.addEventListener('click',()=>{
    modal_desmarcar.close()
})



ok_modal.map((e)=>{
    e.addEventListener('click',()=>{
        location.reload()
    })
})
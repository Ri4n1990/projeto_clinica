let  cpf_paciente = document.getElementById('cpf_paciente')
let tel_paciente = document.getElementById('telefone_paciente')
let nome_paciente = document.getElementById('nome_paciente')
let campos_input = [...document.getElementsByClassName('verificacao')]
let btn_cadastro = document.getElementsByTagName('button')[0]
let cep_paciente = document.getElementById('cep_cliente')
const formulario = document.getElementsByTagName('form')[0]

function verifica_form(){
    let valido = true
    campos_input.map((e)=>{

        valido = e.validity.valid ? true : false
        
        

    })
    return valido
}

cpf_paciente.addEventListener('input',()=>{

    const regex = /\D/g
    var valor_cpf = cpf_paciente.value
    valor_cpf = valor_cpf.replace(regex,'') 

    
    valor_cpf = valor_cpf.replace(/(\d{3})(\d+)/,'$1.$2')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3-$4')
    


    cpf_paciente.value = valor_cpf




})


tel_paciente.addEventListener('input',()=>{
    let valor_telefone = tel_paciente.value.replace(/\D/g, '');

    if (valor_telefone.length > 10) {
        valor_telefone = valor_telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');
    } else if (valor_telefone.length > 6) {
        valor_telefone = valor_telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1)$2-$3');
    } else if (valor_telefone.length > 2) {
        valor_telefone = valor_telefone.replace(/^(\d{2})(\d{0,5})/, '($1)$2');
    } else {
        valor_telefone = valor_telefone.replace(/^(\d+)/, '($1');
    }

    tel_paciente.value = valor_telefone;
})


nome_paciente.addEventListener('input',()=>{

    valor_nome = nome_paciente.value
    nome_paciente.value = valor_nome.replace(/\d/,'')
})


btn_cadastro.addEventListener('click',()=>{



})

btn_cadastro.addEventListener('click',(evt)=>{

    evt.preventDefault()

    campos_input.map((e)=>{
        e.setCustomValidity('')
        console.log(e.validity)
    
        if(e.validity.valid){
            e.nextElementSibling.classList.contains('campo_incorreto') ? e.nextElementSibling.classList.remove('campo_incorreto') : null
        }else{
            e.nextElementSibling.classList.add('campo_incorreto')
        }
        
    })

    verifica_form() ? formulario.submit() : null


})



cep_paciente.addEventListener('input',()=>{
    const regex = /\d{8}/g
    cep_paciente.value = cep_paciente.value.replace(/\D/,'')
    if(regex.test(cep_paciente.value)){
        
        let bairro_paciente = document.getElementById('bairro_cliente')
        let rua_paciente = document.getElementById('rua_paciente')
        

        let endpoint = `https://viacep.com.br/ws/${cep_paciente.value}/json/`

        fetch(endpoint).then(dados=> dados.json()).then(dados_endereco=>{
            
            if('erro'in dados_endereco){
                cep_paciente.nextElementSibling.classList.contains('campo_incorreto') ? null :cep_paciente.nextElementSibling.classList.add('campo_incorreto')
            }else{
                cep_paciente.nextElementSibling.classList.contains('campo_incorreto') ? cep_paciente.nextElementSibling.classList.remove('campo_incorreto') : null

                bairro_paciente.value = dados_endereco.bairro
                rua_paciente.value = dados_endereco.logradouro


            }
        }
        )

    }
})
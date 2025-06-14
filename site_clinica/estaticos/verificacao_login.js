const input_cpf = document.getElementById('cpf_paciente')
const input_senha = document.getElementById('senha_paciente')
const icone_visibilidade = document.getElementById('visibilidade_senha')
const btn_login = document.getElementById('btn_login')
const formulario = document.getElementById('formulario')

input_cpf.setCustomValidity('')
input_senha.setCustomValidity('')



input_cpf.addEventListener('input',()=>{
    const regex = /\D/g
    var valor_cpf = input_cpf.value
    valor_cpf = valor_cpf.replace(regex,'') 

    
    valor_cpf = valor_cpf.replace(/(\d{3})(\d+)/,'$1.$2')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3-$4')
    


    input_cpf.value = valor_cpf
    

})




btn_login.addEventListener('click',(evt)=>{

    evt.preventDefault()
    
    let cpf = document.getElementById('cpf_paciente')
    let senha = document.getElementById('senha_paciente')

    let campo_cpf = document.getElementById('campo_cpf')
    let campo_senha = document.getElementById('campo_senha')

    cpf.validity.valid ? campo_cpf.classList.remove('campo_invalido') : campo_cpf.classList.add('campo_invalido')

    senha.validity.valid ? campo_senha.classList.remove('campo_invalido') : campo_senha.classList.add('campo_invalido')

    cpf.placeholder = campo_cpf.classList.contains('campo_invalido') ? 'Didíte um CPF válido!' : 'Insira seu CPF'

    senha.placeholder = campo_senha.classList.contains('campo_invalido') ? ' Mínimo: 8 caracteres' : 'Insira sua senha'

    cpf.validity.valid ? null : cpf.value = ""

    senha.validity.valid ? null : senha.value = ""

    cpf.validity.valid && cpf.validity.valid ? formulario.submit() : null


    

    








})
    


    
    














  












    
    


    
    


    

    





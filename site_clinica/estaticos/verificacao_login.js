const input_cpf = document.getElementById('cpf_paciente')
const input_senha = document.getElementById('senha_paciente')
const icone_visibilidade = document.getElementById('visibilidade_senha')

input_cpf;addEventListener('input',()=>{
    const regex = /\D/g
    var valor_cpf = input_cpf.value
    
    valor_cpf = valor_cpf.replace(regex,'') 

    
    valor_cpf = valor_cpf.replace(/(\d{3})(\d+)/,'$1.$2')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3-$4')
    


    input_cpf.value = valor_cpf
    
    

})


icone_visibilidade.addEventListener('click',()=>{
    
    icone_visibilidade.classList.toggle('senha_visivel')
    console.log(icone_visibilidade.classList.contains('senha_visivel'))
    input_senha.type = icone_visibilidade.classList.contains('senha_visivel') ? 'text': 'password'
    

    
})
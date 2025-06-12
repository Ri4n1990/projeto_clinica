const input_cpf = document.getElementById('cpf_paciente')


input_cpf;addEventListener('input',()=>{
    const regex = /\D/g
    const valor_cpf = input_cpf.value
    input_cpf.value =  valor_cpf.replace(regex,'') 

    valor_cpf.replace(/(\d{3})(\d+)/,)
    
    

})
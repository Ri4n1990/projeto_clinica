let  cpf_paciente = document.getElementById('cpf_paciente')
let tel_paciente = [...document.getElementsByClassName('telefone')]



cpf_paciente.addEventListener('input',()=>{

    const regex = /\D/g
    var valor_cpf = cpf_paciente.value
    valor_cpf = valor_cpf.replace(regex,'') 

    
    valor_cpf = valor_cpf.replace(/(\d{3})(\d+)/,'$1.$2')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3')
    valor_cpf = valor_cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d+)/,'$1.$2.$3-$4')
    


    cpf_paciente.value = valor_cpf




})


tel_paciente.map((e)=>{
    
    e.addEventListener('input',()=>{
        const regex = /\D/
        let valor_telefone = e.value
        e.value = valor_telefone.replace(regex,'')

        valor_telefone = valor_telefone.replace(/^(\d{2})(\d)$/,'($1)$2')
        valor_telefone = valor_telefone.replace(/^(\(\d{2}\))(\d){1}(\d)$/,'$1$2-$3')
        valor_telefone = valor_telefone.replace(/^(\(\d{2}\))(\d{1}\-)(\d{4})(\d)$/,'$1$2$3-$4')



        e.value = valor_telefone
    })
})
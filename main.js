
// Solicitando ajax com js puro
// //ajax - Asynchronous javaScript and XML

// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('btn-buscar-cep').addEventListener('click', function(){

//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;
//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     })
// })




$(document).ready(function () {

    $('#cep').mask('00000-000');
    $('#btn-buscar-cep').click(function () {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);
        $(this).find('i').addClass('d-none');
        $(this).find('span').removeClass('d-none');

        //Solicitando AJAX com jQuery

        // $.ajax(endpoint).done(function (resposta) {
        //     const logradouro = resposta.logradouro;
        //     const bairro = resposta.bairro;
        //     const cidade = resposta.localidade;
        //     const estado = resposta.uf;
        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado} `;
        //     $('#endereco').val(endereco)

        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none');
        //         $(botao).find('span').addClass('d-none');
        //     }, 4000);

        // })

        //solicitando com fetch API

        //then = try = bloco positivo
        fetch(endpoint).then(function (resposta) {
            return resposta.json()
        })
            .then(function (json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado} `;
                $('#endereco').val(endereco)
            })

            //catch = except = exceção
            .catch(function (erro) {
                alert("Ocorreu um erro ao buscar o endereço. Digite um cep válido ou tente novamente mais tarde")
            })

            //finally = executa de qualquer jeito
            .finally(function () {
                setTimeout(function () {
                    $(botao).find('i').removeClass('d-none');
                    $(botao).find('span').addClass('d-none');
                }, 1000);
            })
    })

    $('#formulario-pedido').submit(function (evento) {
        evento.preventDefault();

        if ($('#nome').val().length == 0) {
            // Faz a função do raise
            throw new Error('Digite o nome');
        }
    })
})

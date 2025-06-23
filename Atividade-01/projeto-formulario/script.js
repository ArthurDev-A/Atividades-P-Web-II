function buscarEndereco() {
    const cep = document.getElementById('cep').value.trim();

    if (cep.length < 8) {
        alert("Digite um CEP válido!");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
            } else {
                document.getElementById('endereco').value =
                    `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            }
        })
        .catch(() => alert("Erro ao buscar o endereço."));
}

document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault();

    const campos = ['matricula', 'nome', 'cep', 'endereco'];

    for (let campo of campos) {
        const valor = document.getElementById(campo).value.trim();
        if (valor.length < 3) {
            alert(`O campo ${campo} deve ter no mínimo 3 caracteres!`);
            return;
        }
    }

    alert("Formulário enviado com sucesso!");
});

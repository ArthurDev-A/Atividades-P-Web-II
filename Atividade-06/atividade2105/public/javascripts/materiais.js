document.addEventListener('DOMContentLoaded', function() {
    const botoesDel = document.querySelectorAll('.deletar');
    botoesDel.forEach(botao => {
        botao.addEventListener('click', async function() {
            const id = botao.getAttribute('material_id');
            
            const confirmar = confirm(`Tem certeza que deja exluir o material ${id}?`)
            if (!confirmar) return;

            try {
                const resp = await fetch(`/delete/${id}`, {
                    method: 'DELETE'
                });

                const result = await resp.json();

                if(result.ok) {
                    alert('Material excluído com sucesso.');
                    location.reload();
                } else {
                    alert(`Erro ao excluir: ${result.message || result.error}`);
                }
            } catch (err) {
                alert('Erro na requisição: ' + err.message);
            }
        })
    });

    const botoesUpdate = document.querySelectorAll('.editar');
    botoesUpdate.forEach(botao => {
        botao.addEventListener('click', async function() {
            const id = botao.getAttribute('material_id');

            window.location.href = '/update/'+id;
        })
    });
});
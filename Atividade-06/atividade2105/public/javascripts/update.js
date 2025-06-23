document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-update');

    if(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = form.querySelector('#id').value;
            const nome = form.querySelector('#nome').value;
            const descricao = form.querySelector('#descricao').value;
            const quantidade = form.querySelector('#quantidade').value;

            try {
                const resp = await fetch('/update/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, nome, descricao, quantidade })
                });

                const result = await resp.json()

                if (resp.ok && result.ok) {
                    alert('Material atualizado com sucesso!');
                    window.location.href = '/';
                } else {
                    alert(result.message || 'Erro ao atualizar material.')
                }
            } catch (err) {
                alert('Erro na requisição: ' + err.message);
            }
        });
    }
});
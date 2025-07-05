const API_URL = 'http://localhost:3000/api/usuarios'; // ajuste se a porta for diferente

async function carregarUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar usuários');

    const usuarios = await response.json();
    const tbody = document.querySelector('#usuarios-table tbody');
    tbody.innerHTML = ''; // Limpa antes de inserir

    usuarios.forEach(usuario => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${new Date(usuario.createdAt).toLocaleString()}</td>
        <td>${new Date(usuario.updatedAt).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (err) {
    alert('Erro ao carregar usuários: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', carregarUsuarios);
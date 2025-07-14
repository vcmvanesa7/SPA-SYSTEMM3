import { getAllUsers, deleteUser } from '../services/users.js'; // ✅
import { openModal } from './modal.js';

export async function renderUserTable(container) {
  try {
    const users = await getAllUsers();

    const tableHTML = `
      <section class="user-table-section">
        <h3>Lista de Usuarios</h3>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Matrícula</th>
              <th>Fecha de Ingreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.phone || 'No disponible'}</td>
                <td>${user.enrollNumber || 'No generada'}</td>
                <td>${user.dateOfAdmission || 'No registrada'}</td>
                <td>
                  <button class="edit-btn" data-id="${user.id}">✏️</button>
                  <button class="delete-btn" data-id="${user.id}">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `;

    container.innerHTML = tableHTML;

    // ✅ Delegación de eventos para editar y eliminar
    container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('edit-btn')) {
        const id = e.target.dataset.id;
        try {
          const res = await fetch(`http://localhost:3000/users/${id}`);
          const userData = await res.json();
          openModal(userData);
        } catch (error) {
          alert('Error al cargar el usuario');
        }
      }

      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');

        if (confirmDelete) {
          const success = await deleteUser(id);
          if (success) {
            alert('Usuario eliminado correctamente');
            renderUserTable(container); // ✅ Recarga la tabla
          } else {
            alert('Hubo un error al eliminar el usuario.');
          }
        }
      }
    });

  } catch (error) {
    container.innerHTML = `<p>Error al cargar usuarios.</p>`;
    console.error('Error:', error);
  }
}

import { getUserStorage } from '../utils/storage.js';
import { renderHeader, setupHeaderEvents } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderModal, openModal, closeModal } from '../components/modal.js';
import { renderUserTable } from '../components/userTable.js';
import { registerUser } from '../services/users.js';


export function renderDashboard(app) {
    const user = getUserStorage();

    if (!user || user.role !== 'admin') {
        window.location.hash = '#/';
        return;
    }

    app.innerHTML = `
    ${renderHeader()}
    ${renderSidebar()}

    <section class="dashboard">
      <h2>Panel de Administración</h2>
      <p>Bienvenido, ${user.name}.</p>

      <div class="admin-shortcuts">
        <a href="#/users" class="admin-link">👥 Gestionar Usuarios</a>
        <a href="#/courses" class="admin-link">📚 Gestionar Cursos</a>
        <a href="#/home" class="admin-link">🏠 Inicio</a>
      </div>
    </section>
  `;

    setupHeaderEvents(); // logout
}
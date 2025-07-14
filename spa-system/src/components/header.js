import { getUserStorage } from '../utils/storage.js';

// Este componente genera el encabezado del panel con información del usuario logueado
export function renderHeader() {
  const user = getUserStorage(); // Obtenemos al usuario desde localStorage

  if (!user) return ''; // Si no hay usuario, no mostramos nada

  return `
    <header class="main-header">
      <div class="user-info">
        <p><strong>${user.name}</strong> (${user.role})</p>
      </div>
    </header>
  `;
}

export function setupHeaderEvents() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedUser'); // Borra datos
      window.location.hash = '#/';           // Redirige a inicio
    });
  }
}


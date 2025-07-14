import { getUserStorage } from '../utils/storage.js';
import { renderHeader, setupHeaderEvents } from '../components/header.js'; // 👈 Agrega esto

export function renderUserHome(app) {
  const user = getUserStorage();

  // Validar que el usuario esté logueado y sea un 'user'
  if (!user || user.role !== 'user') {
    window.location.hash = '#/'; // Si no es usuario normal, redirige a vista pública
    return;
  }

  // Si es válido, mostramos la vista
  app.innerHTML = `
    ${renderHeader()} <!-- Agregamos el header aquí arriba -->
    <section class="user-home">
      <h2>Bienvenido usuario</h2>
      <p>Has iniciado sesión como usuario.</p>
    </section>
  `;

  setupHeaderEvents(); //  Activamos el botón "Cerrar sesión"
}
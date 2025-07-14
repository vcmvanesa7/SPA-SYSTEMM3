// src/components/sidebar.js

// Sidebar de navegación para el panel de administrador
export function renderSidebar() {
    return `
    <nav class="sidebar">
      <ul>
        <li><a href="#/dashboard">Inicio</a></li>
        <li><a href="#/users">Usuarios</a></li>
        <li><a href="#/courses">Cursos</a></li>
      </ul>
      <button id="logout-btn">Cerrar sesión</button>
    </nav>
  `;
}

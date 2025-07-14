// Importamos todas las vistas necesarias
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderPublic } from './pages/public.js';
import { renderUserHome } from './pages/userHome.js';
import { renderAdminCourses } from './pages/adminCourses.js';
import { renderAdminUsers } from './pages/adminUsers.js';
import { getUserStorage } from './utils/storage.js';

// Definimos las rutas válidas
const routes = {
  '#/login': renderLogin,
  '#/register': renderRegister,
  '#/dashboard': renderDashboard,
  '#/courses': renderAdminCourses,
  '#/users': renderAdminUsers,
  '#/user-home': renderUserHome,
  '#/': renderPublic
};

// Obtenemos el contenedor principal donde se renderizan las vistas
const app = document.getElementById('app');

/**
 * Función router
 * Esta función actúa como el enrutador de nuestra SPA.
 */
function router() {
  const hash = window.location.hash || '#/';
  const user = getUserStorage();
  const route = routes[hash];

  // Si no hay usuario logueado
  if (!user) {
    if (hash === '#/login') {
      return renderLogin(app);
    } else if (hash === '#/register') {
      return renderRegister(app);
    } else {
      return renderPublic(app); // Por defecto vista pública
    }
  }

  // Si el usuario ya está logueado y trata de ir a login o register
  if (hash === '#/login' || hash === '#/register') {
    window.location.hash = '#/';
    return;
  }

  // Si es admin
  if (user.role === 'admin') {
    if (hash === '#/dashboard' || hash === '#/' || hash === '') {
      return renderDashboard(app);
    }

    // Rutas permitidas para admin
    if (hash === '#/courses') return renderAdminCourses(app);
    if (hash === '#/users') return renderAdminUsers(app);

    // Si intenta otra ruta, redirigimos
    window.location.hash = '#/dashboard';
    return;
  }

  // Si es usuario normal
  if (user.role === 'user') {
    if (hash === '#/user-home' || hash === '#/' || hash === '') {
      return renderUserHome(app);
    }

    window.location.hash = '#/user-home';
    return;
  }

  // Si algo sale mal o el rol es desconocido
  return renderPublic(app);
}

// Ejecutamos el router al cargar y cuando cambia la URL
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
import { renderLogin } from './login.js';

export function renderPublic(app) {    //export  para ser usada en otros archivos (main.js)
  //Vamos a escribir contenido HTML usando `` dentro del div app
  app.innerHTML = ` 
    <section class = "public-page" >
      <h2>Bienvenido al Sistema de Administración</h2>
      <p>Por favor, inicia sesión o regístrate para acceder</p>
      <button id="login-btn">Iniciar Sesión</button>
      <button id="register-btn">Registrarse</button>
    </section>
  `;
  // Ahora sí existen los botones en el DOM, podemos acceder a ellos
  document.getElementById('login-btn').addEventListener('click', () => {
    window.location.hash = '#/login'; // esto activa router y muestra la vista de login
    console.log('Click en login');
    renderLogin(app);
  });

  document.getElementById('register-btn').addEventListener('click', () => {
    window.location.hash = '#/register';
    console.log('Click en register');
  });
}
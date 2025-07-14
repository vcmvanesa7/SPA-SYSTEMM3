import { loginUser } from '../services/auth.js'; // Importa la función que se encarga de hacer la petición al servidor

// Función que pinta en pantalla el formulario de inicio de sesión
export function renderLogin(app) {
  // Inserta el HTML del formulario dentro del div con id="app"
  app.innerHTML = `
    <section class="login-section">
      <h2>Iniciar Sesión</h2>
      <form id="login-form">    
        <label for="email">Correo:</label>
        <input type="email" id="email" name="email" required />
        <small id="email-error" class="error-msg"></small> <!-- Mensaje de error para el email -->

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />
        <small id="password-error" class="error-msg"></small> <!-- Mensaje de error para la contraseña -->

        <div class ="btns-register-login" >
        <button type="submit">Ingresar</button>
        <button id="back-btn">← Volver</button> <!-- Botón para volver a la vista pública -->
        </div>
      </form>
    </section>
  `;

  const form = document.getElementById('login-form'); // Captura el formulario

  // Escucha el envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Limpiar mensajes de error anteriores
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // Capturamos los valores ingresados por el usuario
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let isValid = true; // Variable para saber si el formulario es válido

    // Validación del formato de email (básico: debe tener @ y .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Correo electrónico inválido';
      isValid = false;
    }

    // Validación de longitud mínima de la contraseña
    if (password.length < 6) {
      document.getElementById('password-error').textContent = 'Mínimo 6 caracteres';
      isValid = false;
    }

    // Si no pasó las validaciones, detenemos el proceso
    if (!isValid) return;

    // Si todo está bien, intentamos hacer login llamando al servicio
    const user = await loginUser(email, password);

    if (user) {
      // Si el login fue exitoso, guardamos al usuario en el localStorage
      localStorage.setItem('loggedUser', JSON.stringify(user));

      // Redireccionamos a la vista correspondiente (pública, admin o user)
      window.location.hash = ''; // Esto activa el router
    } else {
      // Si el login falla, mostramos alerta y limpiamos el formulario
      alert('Correo o contraseña incorrectos');
      form.reset();
    }
  });

  document.getElementById('register-btn').addEventListener('click', () => {
    window.location.hash = '#/register';
  });  
  
  // Botón para volver a la vista pública
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.hash = '#/';
  });

}
import { registerUser } from "../services/users.js";

export function renderRegister(app) {
    app.innerHTML = `
    <section class="register-section">
      <h2>Registrarse</h2>
      <form id="register-form">    
        <!-- Nombre -->
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
        <small id="name-error" class="error-msg"></small>

        <!-- Correo -->
        <label for="email">Correo:</label>
        <input type="email" id="email" name="email" required />
        <small id="email-error" class="error-msg"></small>

        <!-- Teléfono -->
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" required />
        <small id="phone-error" class="error-msg"></small>

        <!-- Contraseña -->
        <label for="password">Contraseña:</label>
        <div class="password-container">
          <input type="password" id="password" name="password" required />
        </div>
        <small id="password-error" class="error-msg"></small>

        <!-- Rol: usuario o admin -->
        <label for="role">Rol:</label>
        <select id="role" name="role" required>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <!-- Clave secreta para admin (se muestra solo si elige admin) -->
        <div id="admin-key-container" style="display: none;">
          <label for="admin-key">Clave secreta de admin:</label>
          <input type="password" id="admin-key" />
          <small id="admin-key-error" class="error-msg"></small>
        </div>
        <div class ="btns-register-login">
        <button type="submit">Register</button>
      </form>
      <button id="back-btn">← Back</button> 
      </div>
    </section>
  `;

    // Mostrar/ocultar campo de clave secreta si elige "admin"
    const roleSelect = document.getElementById('role');
    const adminKeyContainer = document.getElementById('admin-key-container');
    roleSelect.addEventListener('change', () => {
        adminKeyContainer.style.display = roleSelect.value === 'admin' ? 'block' : 'none';
    });

    // Validaciones y envío del formulario
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        // Capturar valores
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value.trim();
        const role = document.getElementById('role').value;
        const adminKey = document.getElementById('admin-key').value;

        let isValid = true;

        // Validar nombre
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!nameRegex.test(name)) {
            document.getElementById('name-error').textContent = 'Solo letras, sin números ni símbolos';
            isValid = false;
        }


        // Validar contraseña segura
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById('password-error').textContent =
                'Debe tener mínimo 8 caracteres, una mayúscula y un número';
            isValid = false;
        }

        // Validar teléfono
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phone-error').textContent = 'Número no válido. Solo dígitos (7 a 15 caracteres).';
            isValid = false;
        }

        // Validar clave secreta si es admin
        if (role === 'admin') {
            const SECRET_KEY = 'claveadmin123';
            if (adminKey !== SECRET_KEY) {
                document.getElementById('admin-key-error').textContent = 'Clave secreta incorrecta';
                isValid = false;
                document.getElementById('register-form').reset();
                adminKeyContainer.style.display = 'none';
            }
        }

        if (!isValid) return;

        // Verificar si ya existe ese correo
        const res = await fetch(`http://localhost:3000/users?email=${email}`);
        const users = await res.json();
        if (users.length > 0) {
            document.getElementById('email-error').textContent = 'Este correo ya está registrado.';
            return;
        }

        /**
         * Generamos el usuario con campos visibles (name, email, password, phone, role)
         * y los campos ocultos (id y fecha de ingreso) se generan automáticamente
         * dentro de registerUser.
         */
        const newUser = {
            name,
            email,
            password,
            role,
            phone,
            // El ID tipo "001" y la fecha de ingreso se generan automáticamente en services/users.js
        };

        const result = await registerUser(newUser);

        if (result) {
            alert('Usuario registrado con éxito');
            window.location.hash = '#/login';
        } else {
            alert('No se pudo registrar. Intenta de nuevo');
        }
    });

    // Botón volver a inicio
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.hash = '#/';
    });
}

/**
 * Renderiza el modal para crear o editar usuarios
 */
export function renderModal() {
    // Elimina cualquier modal duplicado antes de crear uno nuevo
    const existingModal = document.getElementById('user-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'user-modal';
    modal.classList.add('modal');
    modal.style.display = 'none';

    modal.innerHTML = `
    <div class="modal-content">
      <span id="close-modal" class="close">&times;</span>
      <h3 id="modal-title">Crear usuario</h3>

      <form id="user-form">
        <label for="modal-name">Nombre:</label>
        <input type="text" id="modal-name" name="name" required />

        <label for="modal-email">Correo:</label>
        <input type="email" id="modal-email" name="email" required />

        <label for="modal-phone">Teléfono:</label>
        <input type="tel" id="modal-phone" name="phone" required />

        <label for="modal-password">Contraseña:</label>
        <input type="password" id="modal-password" name="password" required />

        <label for="modal-role">Rol:</label>
        <select id="modal-role" name="role" required>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <div id="modal-admin-key-container" style="display: none;">
          <label for="modal-admin-key">Clave secreta de admin:</label>
          <input type="password" id="modal-admin-key" name="adminKey" />
        </div>

        <button type="submit" id="modal-submit">Guardar</button>
      </form>
    </div>
  `;

    document.body.appendChild(modal);

    // Cerrar modal al hacer clic en la X
    document.getElementById('close-modal').addEventListener('click', closeModal);

    // Mostrar/ocultar clave secreta si el rol es admin
    const roleSelect = document.getElementById('modal-role');
    const keyContainer = document.getElementById('modal-admin-key-container');

    roleSelect.addEventListener('change', () => {
        keyContainer.style.display = roleSelect.value === 'admin' ? 'block' : 'none';
    });
}

/**
 * Abre el modal (vacío o con datos si es edición)
 * @param {Object|null} userData 
 */
export function openModal(userData = null) {
    const modal = document.getElementById('user-modal');
    modal.style.display = 'block';

    const title = document.getElementById('modal-title');
    const submitBtn = document.getElementById('modal-submit');
    const form = document.getElementById('user-form');

    if (userData) {
        title.textContent = 'Editar usuario';
        submitBtn.textContent = 'Actualizar';
        form.dataset.userId = userData.id.toString();

        document.getElementById('modal-name').value = userData.name;
        document.getElementById('modal-email').value = userData.email;
        document.getElementById('modal-phone').value = userData.phone || '';
        document.getElementById('modal-password').value = userData.password;
        document.getElementById('modal-role').value = userData.role;
    } else {
        title.textContent = 'Crear usuario';
        submitBtn.textContent = 'Guardar';
        form.reset();
        delete form.dataset.userId;
    }
}

/**
 * Cierra el modal
 */
export function closeModal() {
    const modal = document.getElementById('user-modal');
    if (modal) modal.style.display = 'none';
}

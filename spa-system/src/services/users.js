const API_URL = 'http://localhost:3000/users'; // Ruta a la base de datos

/**
 * Registra un nuevo usuario después de validar datos
 * Si se proporciona un userId, se asume que es una edición y se omiten ciertos pasos
 */
export async function registerUser(newUser, userId = null) {
    try {
        // 1. Limpieza general de datos
        const name = newUser.name.trim();
        const email = newUser.email.trim();
        const password = newUser.password.trim();
        const role = newUser.role;
        const phone = newUser.phone.trim();

        // 2. Validación de campos vacíos
        if (!name || !email || !password || !role || !phone) {
            alert('Todos los campos son obligatorios.');
            return null;
        }

        // 3. Validar nombre
        const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!nameRegex.test(name)) {
            alert('El nombre solo puede contener letras y espacios.');
            return null;
        }

        // 4. Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Correo electrónico no válido. Usa formato: ejemplo@correo.com');
            return null;
        }

        // 5. Validar contraseña segura
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
            return null;
        }

        // 6. Validar rol permitido
        const rolesPermitidos = ['user', 'admin'];
        if (!rolesPermitidos.includes(role)) {
            alert('Rol no permitido.');
            return null;
        }

        // ✅ 7. Verificar si el correo ya existe en otro usuario distinto (IMPORTANTE para edición)
        const resCheck = await fetch(`${API_URL}?email=${email}`);
        const usersWithEmail = await resCheck.json();

        // ✅ Solo bloqueamos si estamos creando un nuevo usuario
        if (!userId && usersWithEmail.length > 0) {
            return null;
        }

        // Si es edición, solo validamos correo y retornamos true (el PUT se maneja fuera)
        if (userId) {
            return true;
        }

        // 8. Generar ID automático (secuencial según número de registros actuales)
        const allUsersRes = await fetch(API_URL);
        const allUsers = await allUsersRes.json();
        const nextId = (allUsers.length + 1).toString().padStart(3, '0');

        // 9. Fecha actual
        const currentDate = new Date().toISOString().split('T')[0];

        // 10. Generar número de matrícula automático
        const enrollNumber = `MAT-${nextId}`;

        // 11. Usuario final para enviar a la base de datos
        const userToRegister = {
            id: nextId,
            name,
            email,
            password,
            role,
            phone,
            dateOfAdmission: currentDate,
            enrollNumber
        };

        // 12. Enviar al servidor con método POST
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToRegister)
        });

        if (!res.ok) throw new Error('Error al registrar usuario');

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Error en registerUser:', error);
        alert('Ocurrió un error al registrar. Intenta de nuevo.');
        return null;
    }
}

/**
 * Trae todos los usuarios desde la API (json-server)
 * @returns {Array} Lista de usuarios
 */
export async function getAllUsers() {
    try {
        const res = await fetch(API_URL); // Petición GET a /users
        if (!res.ok) throw new Error('Error al obtener los usuarios');

        const users = await res.json();   // Convertimos la respuesta a JSON
        return users;
    } catch (error) {
        console.error('Error en getAllUsers:', error);
        return [];
    }
}

/**
 * Elimina un usuario por ID
 * @param {string} userId 
 * @returns {boolean} true si se eliminó correctamente
 */
export async function deleteUser(userId) {
    try {
        const res = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error('Error al eliminar el usuario');
        return true;
    } catch (error) {
        console.error('Error en deleteUser:', error);
        return false;
    }
}
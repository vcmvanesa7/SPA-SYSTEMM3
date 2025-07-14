//endpoint de usuarios -Mi base de datos vive en esta dirección.
const API_URL = 'http://localhost:3000/users';


export async function loginUser(email, password) {
    try {
        const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
        //Esto genera una URL como: http://localhost:3000/users?email=admin@admin.com&password=admin123
        const users = await res.json();

        //Si encontró un usuario que coincida con email y password
        if (users.length > 0) {
            return users[0]; // Usuario encontrado
        } else {
            return null; 
        }
    } catch (error) {   // Capturamos errores , mostramos en consola y retorno null para que no devuelva 'undefined'
        console.log('Error en loginUser', error);
        return null;
    }
};
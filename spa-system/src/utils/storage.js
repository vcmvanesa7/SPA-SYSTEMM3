export function getUserStorage() {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
}
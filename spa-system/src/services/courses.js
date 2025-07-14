// src/services/courses.js

const API_URL = 'http://localhost:3000/courses';

/**
 * Obtener todos los cursos
 */
export async function getAllCourses() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Error al obtener los cursos');
        return await res.json();
    } catch (error) {
        console.error('Error en getAllCourses:', error);
        return [];
    }
}

/**
 * Crear un nuevo curso
 */
export async function createCourse(courseData) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        if (!res.ok) throw new Error('Error al crear el curso');
        return await res.json();
    } catch (error) {
        console.error('Error en createCourse:', error);
        return null;
    }
}

/**
 * Actualizar curso por ID
 */
export async function updateCourse(id, updatedData) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (!res.ok) throw new Error('Error al actualizar el curso');
        return await res.json();
    } catch (error) {
        console.error('Error en updateCourse:', error);
        return null;
    }
}

/**
 * Eliminar curso por ID
 */
export async function deleteCourse(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Error al eliminar el curso');
        return true;
    } catch (error) {
        console.error('Error en deleteCourse:', error);
        return false;
    }
}
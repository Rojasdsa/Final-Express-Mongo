'use strict'

// Script para eliminar Personaje
const btnEliminar = document.querySelectorAll('.eliminarBtn'); // Selecciona todos los botones de eliminar
btnEliminar.forEach(btn => {
    btn.addEventListener('click', () => {
        const personajeId = btn.dataset.id; // Obtén el ID del personaje del botón que se hizo clic
        const formId = `#eliminarForm${personajeId}`;
        const form = document.querySelector(formId);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const data = await fetch(`/chars/${personajeId}`, {
                    method: 'DELETE'
                });
                const res = await data.json();
                console.log(res);
                if (res.estado) {
                    window.location.href = '/chars';
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
});

// Script para editar Personaje
const formEditar = document.querySelector('#editar');
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = formEditar.elements['nombre'].value;
    const casa = formEditar.elements['casa'].value;
    const estado = formEditar.elements['estado'].value;
    const edad = formEditar.elements['edad'].value;
    const titulo = formEditar.elements['titulo'].value;
    const _id = formEditar.dataset.id;
    const data = await fetch(`/chars/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, casa, estado, edad, titulo })
    });
    const res = await data.json();
    if (res.estado) {
        window.location.href = '/chars';
    } else {
        console.log(res);
    }
});

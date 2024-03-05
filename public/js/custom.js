'use strict'

// Script para eliminar Personaje
document.addEventListener('DOMContentLoaded', () => {
    const botonesEliminar = document.querySelectorAll('#eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async (e) => {
            const id = boton.dataset.id;
                const data = await fetch(`/chars/${id}`, {
                    method: 'DELETE',
                });
                const res = await data.json();
                if (res.estado) {
                    // Recargar la página o actualizar según necesidad
                    window.location.reload();
                } else {
                    console.error('Error al eliminar el personaje:', res.error);
                    // Mostrar mensaje de error o realizar otra acción según necesidad
                }
        });
    });
});


// Script para editar Personaje
document.addEventListener('DOMContentLoaded', () => {
    const formsEditar = document.querySelectorAll('#editar');
    formsEditar.forEach(formEditar => {
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
    });
});

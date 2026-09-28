import { obtenerProductoPorId } from "./api/productos.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function iniciarFicha() {
    if (!id) {
        console.warn("No se proporcionó ningún ID en la URL (ejemplo: ficha.html?id=1)");
        return;
    }

    try {
        const producto = await obtenerProductoPorId(id);
        console.log("Detalle del producto obtenido:", producto);
    } catch (error) {
        console.error(`Error al cargar el producto con ID ${id}:`, error);
    }
}

iniciarFicha();




import { obtenerProductos, filtrarProductosPorCategoria } from "./api/productos.js";

const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

async function iniciarListado() {
    try {
        const productos = await obtenerProductos();

        // Si hay una categoría en la URL, filtramos; si no, dejamos todos
        const productosFiltrados = categoria
            ? filtrarProductosPorCategoria(productos, categoria)
            : productos;

        console.log("Categoría seleccionada:", categoria);
        console.log("Productos a mostrar:", productosFiltrados);
    } catch (error) {
        console.error("Error al cargar los productos del listado:", error);
    }
}

iniciarListado();



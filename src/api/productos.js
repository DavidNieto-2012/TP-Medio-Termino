// Funciones que llaman a la API y devuelven datos ya procesados: "traer todos los productos", "traer solo los de una categoría", etc

import { API_URL, crearHeaders, procesarRespuesta } from "./api.js";

// Función que obtiene todos los productos de la API
export async function obtenerProductos() {
  const productos = await fetch(`${API_URL}/products/`, {
    method: "GET",
    headers: crearHeaders(),
  });
  return procesarRespuesta(productos);
}

// Verificar si un producto tiene cierta etiqueta (tag) en su lista de etiquetas
export function tieneEtiqueta(producto, nombreEtiqueta) {
  if (!producto.tags || producto.tags.length === 0) {
    return false; // Si no hay etiquetas o es un array vacío, retorna false
  }
  return producto.tags.some((tag) => tag.title === nombreEtiqueta);
}

// Obtener productos en promoción
export async function obtenerProductosEnPromocion() {
  const productos = await obtenerProductos();
  return productos.filter((producto) => tieneEtiqueta(producto, "Promoción"));
}


// Se Obtiene el detalle de un único producto por su ID
export async function obtenerProductoPorId(id) {
  if (!id) throw new Error("Se requiere un ID de producto");

  const respuesta = await fetch(`${API_URL}/products/${id}`, {
    method: "GET",
    headers: crearHeaders(),
  });
  return procesarRespuesta(respuesta);
}
//---------------------------------------------------------------------------------------
// Filtra una lista de productos según el ID o nombre de categoría
export function filtrarProductosPorCategoria(productos, categoriaId) {
  if (!categoriaId) return productos; // Si no hay filtro, devuelve todos

  return productos.filter((producto) => {
    // Ajustar según la propiedad exacta que devuelva la API (ej. producto.category_id o producto.category?.id)
    return String(producto.category_id) === String(categoriaId) ||
      String(producto.category?.id) === String(categoriaId);
  });
}



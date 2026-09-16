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
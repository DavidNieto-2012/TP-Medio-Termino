// Módulo temporal para manipular el carrito en localStorage.
// reemplazar cuando Rodri mergee su versión con Custom Events.

const CLAVE_STORAGE = "carrito";

function leerCarrito() {
  // lee de localStorage y devuelve el array (o [] si no hay nada)
  let carrito = localStorage.getItem(CLAVE_STORAGE);
  if (carrito) {
    return JSON.parse(carrito);
  } else {
    return [];
  }
}

function guardarCarrito(items) {
  // guarda el array en localStorage
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));   
}

function notificarCambio(items) {
  // dispara el CustomEvent 'carrito-actualizado'
    const event = new CustomEvent("carrito-actualizado", { detail: items });
    window.dispatchEvent(event);
}

export function agregarProducto(producto) {
  let carrito = leerCarrito();
  // si ya existe el producto, aumentar cantidad
  let item = carrito.find((i) => i.id === producto.id);
  if (item) {
    item.cantidad++;
  } else {
    // si no existe, agregarlo con cantidad 1
    let nuevoItem = [producto.id, producto.title, producto.price, producto.pictures[0]];
    // los ... spread operator permite crear un nuevo objeto copiando las propiedades de otro. Se agrega una propiedad adicional 'cantidad' con valor 1
    carrito.push({ ...nuevoItem, cantidad: 1 });
  }
  guardarCarrito(carrito);
  notificarCambio(carrito);
}

export function quitarProducto(id) {
  let carrito = leerCarrito();
  carrito = carrito.filter((i) => i.id !== id);
  guardarCarrito(carrito);
  notificarCambio(carrito);
}

export function decrementarProducto(id) {
    let carrito = leerCarrito();
    let item = carrito.find((i) => i.id === id);
    if (item) {
        item.cantidad--;
        if (item.cantidad <= 0) {
            carrito = carrito.filter((i) => i.id !== id);
        }
        guardarCarrito(carrito);
        notificarCambio(carrito);
    }
}
export function vaciarCarrito() {
  guardarCarrito([]);
  notificarCambio([]);
}

export function obtenerItems() {
  return leerCarrito();
}

export function obtenerTotales() {
    let carrito = leerCarrito();
    // reduce() recorre el array y acumula un valor a medida que visita cada elemento
    //array.reduce((acumulador, elementoActual) => { ... }, valorInicial)
    let totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    let totalPrecio = carrito.reduce((acc, item) => acc + item.cantidad * item.price, 0);
    return { totalCantidad, totalPrecio };
}
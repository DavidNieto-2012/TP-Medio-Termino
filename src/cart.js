const CLAVE_CARRITO = 'carrito_supermercado';

// 1. Obtener los productos guardados en localStorage
export function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

export function obtenerItems() {
  return obtenerCarrito();
}

// 2. Guardar en localStorage y notificar a la app
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  
  window.dispatchEvent(new CustomEvent('carrito-actualizado', { 
    detail: { carrito } 
  }));
}

// 3. Agregar un producto al carrito (ESTA ES LA FUNCIÓN QUE TE PEDÍA EL ERROR)
export function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(item => item.id === producto.id);

  if (indice >= 0) {
    carrito[indice].cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  guardarCarrito(carrito);
}

// 4. Quitar un producto o reducir su cantidad
export function quitarDelCarrito(idProducto, soloReducir = false) {
  let carrito = obtenerCarrito();
  const indice = carrito.findIndex(item => item.id === idProducto);

  if (indice >= 0) {
    if (soloReducir && carrito[indice].cantidad > 1) {
      carrito[indice].cantidad -= 1;
    } else {
      carrito = carrito.filter(item => item.id !== idProducto);
    }
  }

  guardarCarrito(carrito);
}

export function decrementarProducto(id) {
  quitarDelCarrito(id, true);
}

// 5. Vaciar todo el carrito
export function vaciarCarrito() {
  guardarCarrito([]);
}

// 6. Calcular la cantidad total de ítems y el precio total
export function obtenerTotalesCarrito() {
  const carrito = obtenerCarrito();
  
  const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const precioTotal = carrito.reduce((acumulado, item) => {
    const precio = item.price || item.precio || 0;
    return acumulado + (precio * item.cantidad);
  }, 0);

  return { cantidadTotal, precioTotal };
}

export function obtenerTotales() {
  return obtenerTotalesCarrito();
}
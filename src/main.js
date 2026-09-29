// 1. Carga de los estilos globales con TailwindCSS
import './index.css';

// 2. Registro de los componentes principales del proyecto
import './components/tp-medio-termino.js';
import './components/carrito/index-carrito.js';
<<<<<<< HEAD

// Header y Footer (comentados por ahora para evitar errores si la ruta varía)
// import './components/layout/header.js';
// import './components/layout/footer.js';
=======
import './components/tarjeta/tarjeta-producto.js';
//header y footer
import './components/Layout/header.js';
import './components/Layout/footer.js';
>>>>>>> origin

// 3. Importación de las funciones de la API
import { obtenerProductos, obtenerProductosEnPromocion } from "./api/productos.js";

// 4. Importación del módulo del Carrito como objeto completo (evita errores de caché de Vite)
import * as CarritoStorage from './store/carrito-storage.js';

const { 
  obtenerCarrito, 
  agregarAlCarrito, 
  quitarDelCarrito, 
  vaciarCarrito, 
  obtenerTotalesCarrito 
} = CarritoStorage;

// 5. Seleccionar el contenedor principal del HTML
const root = document.getElementById('root');

// 6. Inyectar los componentes en la pantalla
if (root) {
<<<<<<< HEAD
    root.innerHTML = `
    <tp-medio-termino></tp-medio-termino>
    <carrito-boton></carrito-boton>
    <carrito-drawer></carrito-drawer>
=======
  root.innerHTML = `
    <app-header></app-header>
    <tp-medio-termino></tp-medio-termino>
    <carrito-boton></carrito-boton>
    <carrito-drawer></carrito-drawer>
    <app-footer></app-footer>
>>>>>>> origin
    `;
}

// 7. Prueba para verificar la conexión con la API
async function probarConexionAPI() {
    try {
        console.log("Cargando productos desde la API...");

        const productos = await obtenerProductos();
        console.log(" Lista completa de productos:", productos);

<<<<<<< HEAD
        const productosPromo = await obtenerProductosEnPromocion();
        console.log(" Productos en promoción:", productosPromo);
    } catch (error) {
        console.error(" Error al conectar con la API:", error);
    }
=======
    const productosPromo = await obtenerProductosEnPromocion();
    console.log(" Productos en promoción:", productosPromo);
  } catch (error) {
    console.error(" Error al conectar con la API:", error);
  }
>>>>>>> origin
}

// Ejecutar prueba de API
probarConexionAPI();

// 8. Escuchador de eventos del Carrito en tiempo real
window.addEventListener('carrito-actualizado', (event) => {
  console.log('🛒 ¡El carrito se actualizó en tiempo real!', event.detail.carrito);
  
  if (typeof obtenerTotalesCarrito === 'function') {
    const totales = obtenerTotalesCarrito();
    console.log(`Totales -> Ítems: ${totales.cantidadTotal} | Monto Total: $${totales.precioTotal}`);
  }
});

// Exponer funciones en window para hacer pruebas directamente desde la consola (F12)
window.probarAgregar = agregarAlCarrito;
window.probarQuitar = quitarDelCarrito;
window.probarVaciar = vaciarCarrito;
window.obtenerCarrito = obtenerCarrito;

console.log('📦 Módulo de carrito cargado correctamente');
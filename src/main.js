// 1. Carga de los estilos globales con TailwindCSS
import './index.css';

// 2. Registro de los componentes principales del proyecto

import './components/carrito/index-carrito.js';
import './components/tarjeta/tarjeta-producto.js';
//header y footer
import './components/Layout/header.js';
import './components/Layout/footer.js';

// 3. Importación de las funciones de la API
import { obtenerProductos, obtenerProductosEnPromocion } from "./api/productos.js";





// 5. Seleccionar el contenedor principal del HTML
const root = document.getElementById('root');

// 6. Inyectar los componentes en la pantalla
if (root) {
  root.innerHTML = `
    <app-header></app-header>
    <carrito-drawer></carrito-drawer>
    <app-footer></app-footer>
    `;
}

// 7. Prueba para verificar la conexión con la API
async function probarConexionAPI() {
    try {
        console.log("Cargando productos desde la API...");

        const productos = await obtenerProductos();
        console.log(" Lista completa de productos:", productos);

    const productosPromo = await obtenerProductosEnPromocion();
    console.log(" Productos en promoción:", productosPromo);
  } catch (error) {
    console.error(" Error al conectar con la API:", error);
  }
}

// Ejecutar prueba de API
probarConexionAPI();


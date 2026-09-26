
// 1. Carga de los estilos globales con TailwindCSS
import './index.css';

// 2. Registro de componentes usados
import './components/carrito/index-carrito.js'

// 3. Importación de las funciones de la API
import { obtenerProductos, obtenerProductosEnPromocion } from "./api/productos.js";
import { obtenerCarrito, agregarAlCarrito } from './cart.js';

// 4. Seleccionar el contenedor principal del HTML
const root = document.getElementById('root');

// 5. Inyectar el componente principal de Lit en la pantalla
if (root) {
  root.innerHTML = `
    <carrito-drawer></carrito-drawer>
  `;
}

// 6. Función de prueba para verificar en consola que la API responde correctamente
async function probarConexionAPI() {
  try {
    console.log("Cargando productos desde la API...");

    const productos = await obtenerProductos();
    console.log(" Lista completa de productos:", productos);

    const productosPromo = await obtenerProductosEnPromocion();
    console.log(" Productos en promoción:", productosPromo);

    //agrego tres productos al carro
    const productosParaCarrito = productos.slice(0, 3);

    productosParaCarrito.forEach(producto => {
      agregarAlCarrito(producto);
    });

    console.log(obtenerCarrito());

  } catch (error) {
    console.error(" Error al conectar con la API:", error);
  }
}

// Ejecutar la prueba
probarConexionAPI();

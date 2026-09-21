// 1. Carga de los estilos globales con TailwindCSS
import './index.css';

// 2. Registro del componente principal del proyecto
import './components/tp-medio-termino.js';

// 3. Importación de las funciones de la API
import { obtenerProductos, obtenerProductosEnPromocion } from "./api/productos.js";

// 4. Seleccionar el contenedor principal del HTML
const root = document.getElementById('root');

// 5. Inyectar el componente principal de Lit en la pantalla
if (root) {
  root.innerHTML = '<tp-medio-termino></tp-medio-termino>';
}

// 6. Función de prueba para verificar en consola que la API responde correctamente
async function probarConexionAPI() {
  try {
    console.log("Cargando productos desde la API...");
    
    const productos = await obtenerProductos();
    console.log("📦 Lista completa de productos:", productos);

    const productosPromo = await obtenerProductosEnPromocion();
    console.log("🔥 Productos en promoción:", productosPromo);
  } catch (error) {
    console.error("❌ Error al conectar con la API:", error);
  }
}

// Ejecutar la prueba
probarConexionAPI();
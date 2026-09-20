// Aquí se decide qué componente se va a renderizar en la página principal (index.html) del proyecto. 

import './index.css'
import './components/tp-medio-termino.js'
import './components/carrito/index-carrito.js'
import { obtenerProductos, obtenerProductosEnPromocion } from "./api/productos.js"

import { agregarProducto, quitarProducto, decrementarProducto, vaciarCarrito, obtenerItems, obtenerTotales } from './store/carrito-storage.js'


const root = document.getElementById('root')

root.innerHTML = `
  <tp-medio-termino></tp-medio-termino >
  <carrito-boton></carrito-boton>
  <carrito-drawer></carrito-drawer>
  <carrito-item></carrito-item>
  <carrito-detalle></carrito-detalle>
`


//provisorio para ver si funciona la conexión con la API y se pueden traer los productos
const productos = await obtenerProductos()
console.log(productos)

const productosPromo = await obtenerProductosEnPromocion()
console.log(productosPromo)

agregarProducto(productos[0]);
agregarProducto(productos[0]);
agregarProducto(productos[1]);
console.log('Items:', obtenerItems());
console.log('Totales:', obtenerTotales());

// item de ejemplo para ver si funciona el componente carrito-item
const item = document.querySelector('carrito-item');
item.item = obtenerItems()[0];
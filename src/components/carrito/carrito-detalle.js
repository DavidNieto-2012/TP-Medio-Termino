// el contenido de adentro del drawer — la lista de items, los totales, el botón de vaciar. Este es el que se suscribe a carrito-actualizado para mantenerse sincronizado

import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import { obtenerItems, incrementarProducto, decrementarProducto, quitarProducto, vaciarCarrito, obtenerTotales } from '../../store/carrito-storage.js';

class CarritoDetalle extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    items: { type: Array },
  };

  constructor() {
    super();
    this.items = [];
  }

  // función que se ejecuta cuando se dispara el evento 'carrito-actualizado'
  _actualizarItems = () => {
    const items = obtenerItems();
    this.items = items;
  }

  _carritoIncrementar = (e) => {
    const id = e.detail.id;
    incrementarProducto(id);
  }

  _carritoDecrementar = (e) => {
    const id = e.detail.id;
    decrementarProducto(id);
  }

  _carritoQuitar = (e) => {
    const id = e.detail.id;
    quitarProducto(id);
  }

  _onVaciar() {
    vaciarCarrito();
  }

  // se ejecuta cuando el componente se agrega al DOM
  connectedCallback() {
    super.connectedCallback();
    this.items = obtenerItems();
    window.addEventListener('carrito-actualizado', this._actualizarItems);
    this.addEventListener('carrito-incrementar', this._carritoIncrementar);
    this.addEventListener('carrito-decrementar', this._carritoDecrementar);
    this.addEventListener('carrito-quitar', this._carritoQuitar);
  }

  // se ejecuta cuando el componente se elimina del DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('carrito-actualizado', this._actualizarItems)
    this.removeEventListener('carrito-incrementar', this._carritoIncrementar);
    this.removeEventListener('carrito-decrementar', this._carritoDecrementar);
    this.removeEventListener('carrito-quitar', this._carritoQuitar);
  }


  render() {
    const { totalCantidad, totalPrecio } = obtenerTotales();

    return html`
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4">Carrito de Compras</h2>
        ${this.items.length === 0
        ? html`<p class="text-sm text-gray-400">El carrito está vacío</p>`
        : this.items.map(item => html`
              <carrito-item .item=${item}></carrito-item>
            `)
      }

        <div class="mt-4 pt-4 border-t">
          <p class="text-sm text-gray-400">Cantidad de productos: ${totalCantidad}</p>
          <p class="text-lg font-bold">Total: $${totalPrecio.toFixed(2)}</p>
        </div>

        <button
          class="mt-4 w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          @click=${this._onVaciar}
        >
          Pagar ahora
        </button>

        <button
          class="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          @click=${this._onVaciar}
        >
          Vaciar carrito
        </button>
      </div>
    `;
  }

}

customElements.define('carrito-detalle', CarritoDetalle);
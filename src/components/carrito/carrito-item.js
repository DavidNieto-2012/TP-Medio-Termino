// una fila individual — recibe un producto como property (no lee del storage directamente) y muestra imagen, nombre, precio, cantidad, botones +/−. carrito-detalle va a renderizar una lista de estos, uno por cada item del carrito

import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';

class CarritoItem extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    item: { type: Object },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="flex items-center justify-between p-2 border-b">
        <div class="flex items-center">
          <img src="${this.item.picture}" alt="${this.item.title}" class="w-16 h-16 object-cover rounded" />
          <div class="ml-4"> 
            <h3 class="font-semibold">${this.item.title}</h3>
            <p class="text-lg font-bold">$${(this.item.price * this.item.cantidad).toFixed(2)}</p>
            <p class="text-sm text-gray-500">Cantidad: ${this.item.cantidad}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">

          <button class="text-green-500 hover:text-green-700" @click=${this._incrementarProducto}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </button>

          <button class="text-yellow-500 hover:text-yellow-700" @click=${this._decrementarProducto}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
            </svg>
          </button>
          
          <button class="text-red-500 hover:text-red-700" @click=${this._quitarProducto}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
              <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // dispara un evento personalizado para que el padre (carrito-detalle) sepa que hay que hacer algo con el item
  _incrementarProducto() {
    this.dispatchEvent(new CustomEvent('carrito-incrementar', {
      detail: { id: this.item.id },
      bubbles: true,
      composed: true,
    }));
  }
  _decrementarProducto() {
    this.dispatchEvent(new CustomEvent('carrito-decrementar', {
      detail: { id: this.item.id },
      bubbles: true,
      composed: true,
    }));
  }
  _quitarProducto() {
    this.dispatchEvent(new CustomEvent('carrito-quitar', {
      detail: { id: this.item.id },
      bubbles: true,
      composed: true,
    }));
  }

}

customElements.define('carrito-item', CarritoItem);
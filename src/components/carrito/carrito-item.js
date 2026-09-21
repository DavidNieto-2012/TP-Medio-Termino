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
    <div class="carrito-item-fila">
      <img class="carrito-item-imagen" src="${this.item.picture}" alt="${this.item.title}" />
      <div class="carrito-item-info">
        <p class="carrito-item-titulo">${this.item.title}</p>
        <p class="carrito-item-precio">$${(this.item.price * this.item.cantidad).toFixed(2)}</p>
        <div class="stepper">
          <button @click=${this._decrementarProducto} aria-label="Restar">−</button>
          <span>${this.item.cantidad}</span>
          <button @click=${this._incrementarProducto} aria-label="Sumar">+</button>
        </div>
      </div>
      <button class="carrito-item-eliminar" @click=${this._quitarProducto} aria-label="Eliminar producto">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
          <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
        </svg>
      </button>
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
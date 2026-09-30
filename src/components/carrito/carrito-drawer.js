// se encarga de mostrarse/ocultarse (abrir/cerrar), escuchando el evento 'carrito-abrir' que ya dispara carrito-boton. Maneja el fondo oscuro (overlay), la animación de deslizamiento, y el botón de cerrar (X)

import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import './carrito-detalle.js'; // Importamos el detalle para que esté disponible dentro del drawer

class CarritoDrawer extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    abierto: { type: Boolean },
  };

  constructor() {
    super();
    this.abierto = false;
  }

  _carritoAbrir = () => {
    this.abierto = true;
  }

  _carritoCerrar = () => {
    this.abierto = false;
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Escape' && this.abierto) {
      this._carritoCerrar();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('carrito-abrir', this._carritoAbrir);
    window.addEventListener('carrito-cerrar', this._carritoCerrar);
    window.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('carrito-abrir', this._carritoAbrir);
    window.removeEventListener('carrito-cerrar', this._carritoCerrar);
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  updated(propiedadesCambiadas) {
    super.updated(propiedadesCambiadas);
    if (propiedadesCambiadas.has('abierto')) {
      window.dispatchEvent(new CustomEvent('carrito-estado-cambiado', {
        detail: { abierto: this.abierto }
      }));
    }
  }

  render() {
    if (!this.abierto) {
      return html``;
    }

    return html`
      <div
        class="carrito-drawer-overlay ${this.abierto ? 'abierto' : ''}"
        @click=${this._carritoCerrar}
      ></div>
      <div class="carrito-drawer ${this.abierto ? 'abierto' : ''}">
        <div class="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 class="text-lg font-semibold">Tu carrito</h2>
          <button
            class="text-2xl leading-none px-2 hover:text-red-500 cursor-pointer"
            @click=${this._carritoCerrar}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>
        <carrito-detalle></carrito-detalle>
      </div>
    `;
  }
}

customElements.define('carrito-drawer', CarritoDrawer);
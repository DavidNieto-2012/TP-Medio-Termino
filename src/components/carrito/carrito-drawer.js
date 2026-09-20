// se encarga de mostrarse/ocultarse (abrir/cerrar), escuchando el evento 'carrito-abrir' que ya dispara carrito-boton. Maneja el fondo oscuro (overlay), la animación de deslizamiento, y el botón de cerrar (X)

import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';

class CarritoDrawer extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    abierto: { type: Boolean },
  };

  constructor() {
    super();
    this.abierto = false;
  }

  // función que se ejecuta cuando se dispara el evento 'carrito-abrir' del carrito-boton
  _carritoAbrir = () => {
    this.abierto = true;
  }

  _carritoCerrar = () => {
    this.abierto = false;
  }

  // se ejecuta cuando el componente se agrega al DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('carrito-abrir', this._carritoAbrir);
    window.addEventListener('carrito-cerrar', this._carritoCerrar);
  }

  // se ejecuta cuando el componente se elimina del DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('carrito-abrir', this._carritoAbrir);
    window.removeEventListener('carrito-cerrar', this._carritoCerrar);
  }

  render() {
    if (!this.abierto) {
      return html``; // no renderiza nada si está cerrado
    }
    return html`
      <div
        class="fixed inset-0 bg-black/50 z-50 flex justify-end"
        @click=${this._carritoCerrar}
      >
        <div
          class="w-full sm:w-96 h-full bg-slate-900 shadow-lg overflow-y-auto"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="flex justify-between items-center p-4 border-b border-slate-700">
            <h2 class="text-lg font-semibold">Tu carrito</h2>
            <button 
              class="text-2xl leading-none px-2 hover:text-red-500"
              @click=${this._carritoCerrar}
              aria-label="Cerrar carrito"
            > ✕ </button>
          </div>
          <carrito-detalle></carrito-detalle>
        </div>
      </div>
    `;
  }
}

customElements.define('carrito-drawer', CarritoDrawer);
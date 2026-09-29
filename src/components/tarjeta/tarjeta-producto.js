
import { LitElement, html, css } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import { agregarAlCarrito } from '../../cart.js';

export class ProductCard extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `
  ];

  static properties = {
    producto: { type: Object }
  };

  constructor() {
    super();
    this.producto = null;
  }

  // Agrega el producto al carrito usando la función del storage
  _agregarAlCarrito(e) {
    e.stopPropagation();
    if (this.producto) {
      agregarAlCarrito(this.producto);
    }
  }

  render() {
    if (!this.producto) return html``;

    const { id, title, price, pictures } = this.producto;

    // la imagen "sin imagen" en caso de no tener una
    const imagen = pictures && pictures.length > 0
      ? pictures[0]
      : 'https://placehold.co/300x300?text=Sin+Imagen';

    return html`
      <article class="relative flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 h-full group">

        <!-- Imagen y Enlace a la Ficha de detalle -->
        <a href="/ficha.html?id=${id}" class="block overflow-hidden rounded-xl bg-slate-50 mb-3 aspect-square flex items-center justify-center">
          <img 
            src="${imagen}" 
            alt="${title}" 
            loading="lazy"
            class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        <!-- Información del producto -->
        <div class="flex-1 flex flex-col justify-between">
          <h3 class="font-medium text-slate-800 text-sm md:text-base line-clamp-2 leading-snug hover:text-indigo-600">
            <a href="/ficha.html?id=${id}">${title}</a>
          </h3>

          <!-- Precio y Botón de compra -->
          <div class="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <span class="text-xs text-slate-400 block font-normal">Precio</span>
              <span class="text-lg md:text-xl font-bold text-slate-900">
                $${Number(price).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <!-- Botón agregar al carrito -->
            <button 
              type="button"
              @click=${this._agregarAlCarrito}
              title="Agregar al carrito"
              class="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }
}

// se registra <product-card> y también <tarjeta-producto> no sé si esta bien.
customElements.define('product-card', ProductCard);
if (!customElements.get('tarjeta-producto')) {
  customElements.define('tarjeta-producto', class extends ProductCard { });
}


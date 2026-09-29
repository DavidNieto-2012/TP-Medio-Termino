import { LitElement, html } from 'lit';
import tailwindStyles from './base/tailwind-element.js';
import { urlImagen } from '../api/api.js';

class ProductCard extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    producto: { type: Object }
  };

  constructor() {
    super();
    this.producto = {};
  }

  _verDetalle() {
    // Navega a la ficha de detalle pasando el id del producto
    window.location.href = `/ficha.html?id=${this.producto.id}`;
  }

  render() {
    const p = this.producto || {};
    const nombre = p.title || p.name || 'Producto';
    const precio = p.price || p.precio || 0;
    const imagen = urlImagen(p.pictures?.[0]);
    const categoria = p.category || p.categoria || 'General';

    return html`
      <div class="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group">
        <div class="relative overflow-hidden cursor-pointer" @click=${this._verDetalle}>
          <img 
            src="${imagen}" 
            alt="${nombre}" 
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span class="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
            ${categoria}
          </span>
        </div>

        <div class="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 
              class="text-lg font-bold text-white mb-2 line-clamp-2 cursor-pointer hover:text-indigo-400 transition-colors"
              @click=${this._verDetalle}
            >
              ${nombre}
            </h3>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <span class="text-xl font-black text-emerald-400">
              $${precio.toLocaleString()}
            </span>
            
            <button 
              @click=${this._verDetalle}
              class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Ver detalle
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);
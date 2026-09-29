import { LitElement, html } from 'lit';
import tailwindStyles from './base/tailwind-element.js';
import { obtenerProductos } from '../api/productos.js';

import './tarjeta-producto.js';
import './product-skeleton.js';

class ListadoVista extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    productos: { type: Array },
    cargando: { type: Boolean },
    categoriaSeleccionada: { type: String }
  };

  constructor() {
    super();
    this.productos = [];
    this.cargando = true;
    this.categoriaSeleccionada = 'todas';
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._cargarCatalogo();
  }

  async _cargarCatalogo() {
    this.cargando = true;
    try {
      const data = await obtenerProductos();
      this.productos = data || [];
    } catch (error) {
      console.error('Error al cargar catálogo:', error);
      this.productos = [];
    } finally {
      this.cargando = false;
    }
  }

  render() {
    const productosFiltrados = this.categoriaSeleccionada === 'todas'
      ? this.productos
      : this.productos.filter(p => (p.category || p.categoria) === this.categoriaSeleccionada);

    return html`
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center md:text-left">
          Catálogo de Productos
        </h1>

        
        ${this.cargando ? html`
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${Array(8).fill(0).map(() => html`<product-skeleton></product-skeleton>`)}
          </div>
        ` : ''}

       
        ${!this.cargando && productosFiltrados.length === 0 ? html`
          <div class="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-800/40 border border-slate-700/50 rounded-3xl">
            <svg class="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <h3 class="text-xl font-bold text-slate-300 mb-2">No se encontraron productos</h3>
            <p class="text-slate-400 max-w-md">No hay artículos disponibles en esta categoría por el momento.</p>
          </div>
        ` : ''}

      
        ${!this.cargando && productosFiltrados.length > 0 ? html`
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${productosFiltrados.map(p => html`
              <tarjeta-producto .producto=${p}></tarjeta-producto>
            `)}
          </div>
        ` : ''}
      </section>
    `;
  }
}

customElements.define('listado-vista', ListadoVista);
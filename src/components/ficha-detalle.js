import { LitElement, html } from 'lit';
import tailwindStyles from './base/tailwind-element.js';
import { obtenerProductos } from '../api/productos.js';
import { agregarAlCarrito } from '../cart.js';
import { urlImagen } from '../api/api.js';

class FichaDetalle extends LitElement {
  static styles = [tailwindStyles];

  static properties = {
    producto: { type: Object },
    cargando: { type: Boolean },
    cantidad: { type: Number }
  };

  constructor() {
    super();
    this.producto = null;
    this.cargando = true;
    this.cantidad = 1;
  }

  async connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    await this._cargarProducto(id);
  }

  async _cargarProducto(id) {
    this.cargando = true;
    try {
      const productos = await obtenerProductos();
      this.producto = productos.find(p => String(p.id) === String(id)) || productos[0];
    } catch (error) {
      console.error('Error al cargar la ficha:', error);
    } finally {
      this.cargando = false;
    }
  }

  _incrementar() {
    this.cantidad += 1;
  }

  _decrementar() {
    if (this.cantidad > 1) this.cantidad -= 1;
  }

  _agregar() {
    if (this.producto) {
      agregarAlCarrito(this.producto, this.cantidad);
    }
  }

  render() {
   
    if (this.cargando) {
      return html`
        <div class="max-w-5xl mx-auto p-6 animate-pulse">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/40 p-6 md:p-8 rounded-3xl border border-slate-700/50">
            <div class="h-96 bg-slate-700/50 rounded-2xl"></div>
            <div class="space-y-4 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="h-4 bg-slate-700/50 rounded w-1/4"></div>
                <div class="h-8 bg-slate-700/50 rounded w-3/4"></div>
                <div class="h-20 bg-slate-700/50 rounded w-full mt-4"></div>
              </div>
              <div class="space-y-4">
                <div class="h-10 bg-slate-700/50 rounded w-1/3"></div>
                <div class="h-12 bg-slate-700/50 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

  
    if (!this.producto) {
      return html`
        <div class="max-w-2xl mx-auto my-12 p-8 text-center bg-slate-800/40 border border-slate-700/50 rounded-3xl shadow-xl">
          <svg class="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-2xl font-bold text-slate-200 mb-2">Producto no encontrado</h2>
          <p class="text-slate-400 mb-6">El artículo que buscas no existe o fue removido del catálogo.</p>
          <a href="/listado.html" class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors">
            ← Volver al catálogo
          </a>
        </div>
      `;
    }

    const p = this.producto;
    
    const primeraImagen = p.pictures?.[0] || p.imagen || p.image;
    const imagen = primeraImagen ? urlImagen(primeraImagen) : 'https://placehold.co/400x400?text=Sin+Imagen';

    return html`
      <div class="max-w-5xl mx-auto p-4 md:p-8">
        <!-- Botón Volver -->
        <a href="/listado.html" class="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors gap-2 text-sm font-medium">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver al catálogo
        </a>

        <!-- Ficha Principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/40 border border-slate-700/50 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <!-- Columna Izquierda: Imagen -->
          <div class="flex items-center justify-center bg-slate-900/60 rounded-2xl p-6 border border-slate-700/40 aspect-square">
            <img 
              src="${imagen}" 
              alt="${p.title || p.name || 'Producto'}" 
              class="max-h-80 w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Columna Derecha: Información y Acciones -->
          <div class="flex flex-col justify-between">
            <div>
              <span class="inline-block text-xs uppercase font-bold text-indigo-400 tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3">
                ${p.category || p.categoria || 'General'}
              </span>
              <h1 class="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-4">
                ${p.title || p.name}
              </h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                ${p.description || p.descripcion || 'Sin descripción disponible para este producto.'}
              </p>
            </div>

            <div class="pt-6 border-t border-slate-700/50">
              <div class="text-3xl md:text-4xl font-black text-white mb-6">
                $${Number(p.price || p.precio || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </div>

              <!-- Control de Cantidad y Agregar al Carrito -->
              <div class="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div class="flex items-center justify-between bg-slate-900/80 rounded-xl border border-slate-700/60 p-1">
                  <button 
                    @click=${this._decrementar} 
                    type="button"
                    class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-bold text-lg transition-colors cursor-pointer"
                  >–</button>
                  <span class="px-4 font-semibold text-white select-none">${this.cantidad}</span>
                  <button 
                    @click=${this._incrementar} 
                    type="button"
                    class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-bold text-lg transition-colors cursor-pointer"
                  >+</button>
                </div>

                <button 
                  @click=${this._agregar}
                  type="button"
                  class="flex-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"></path>
                  </svg>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ficha-detalle', FichaDetalle);
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800 p-6 rounded-3xl border border-slate-700">
            <div class="h-96 bg-slate-700 rounded-2xl"></div>
            <div class="space-y-4">
              <div class="h-8 bg-slate-700 rounded w-3/4"></div>
              <div class="h-6 bg-slate-700 rounded w-1/4"></div>
              <div class="h-24 bg-slate-700 rounded"></div>
              <div class="h-12 bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      `;
    }

    if (!this.producto) {
      return html`
        <div class="text-center py-16 text-slate-300">
          <h2 class="text-2xl font-bold">Producto no encontrado</h2>
          <a href="/listado.html" class="text-indigo-400 underline mt-4 inline-block">Volver al listado</a>
        </div>
      `;
    }

    const p = this.producto;
    const imagen = urlImagen(p.pictures?.[0]);

    return html`
      <div class="max-w-5xl mx-auto p-4 md:p-8">
        <a href="/listado.html" class="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          ← Volver al listado
        </a>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-800/90 border border-slate-700/80 p-6 md:p-8 rounded-3xl shadow-2xl">
          <!-- Galería / Imagen Principal -->
          <div class="flex items-center justify-center bg-slate-900/50 rounded-2xl p-4 border border-slate-700/50">
            <img 
              src="${imagen}" 
              alt="${p.title || p.name}" 
              class="max-h-96 object-contain rounded-xl"
            />
          </div>

          <!-- Información y Acciones -->
          <div class="flex flex-col justify-between">
            <div>
              <span class="text-xs uppercase font-bold text-indigo-400 tracking-wider">
                ${p.category || p.categoria || 'General'}
              </span>
              <h1 class="text-2xl md:text-3xl font-extrabold text-white mt-1 mb-3">
                ${p.title || p.name}
              </h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                ${p.description || p.descripcion || 'Sin descripción disponible para este producto.'}
              </p>
            </div>

            <div>
              <div class="text-3xl font-black text-emerald-400 mb-6">
                $${(p.price || p.precio || 0).toLocaleString()}
              </div>

              <!-- Selector de Cantidad y Botón de Compra -->
              <div class="flex flex-wrap gap-4 items-center">
                <div class="flex items-center bg-slate-900 rounded-xl border border-slate-700">
                  <button @click=${this._decrementar} class="px-3 py-2 text-slate-300 hover:text-white font-bold text-lg">-</button>
                  <span class="px-4 font-semibold text-white">${this.cantidad}</span>
                  <button @click=${this._incrementar} class="px-3 py-2 text-slate-300 hover:text-white font-bold text-lg">+</button>
                </div>

                <button 
                  @click=${this._agregar}
                  class="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95 text-center"
                >
                  🛒 Agregar al carrito
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
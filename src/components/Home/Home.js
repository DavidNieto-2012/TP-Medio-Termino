import { LitElement, html, css } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import { obtenerProductos, obtenerProductosEnPromocion } from '../../api/productos.js';
import '../tarjeta/tarjeta-producto.js';

export class PaginaHome extends LitElement {
    static styles = [
        tailwindStyles,
        css`
      :host {
        display: block;
        min-height: 60vh;
      }
    `
    ];

    static properties = {
        promociones: { type: Array },
        destacados: { type: Array },
        cargando: { type: Boolean }
    };

    constructor() {
        super();
        this.promociones = [];
        this.destacados = [];
        this.cargando = true;
    }

    // Se ejecuta automáticamente al montarse el componente en el DOM
    async connectedCallback() {
        super.connectedCallback();
        await this.cargarProductos();
    }

    async cargarProductos() {
        try {
            this.cargando = true;

            // Llamadas en paralelo a las funciones de la API
            const [todos, promos] = await Promise.all([
                obtenerProductos(),
                obtenerProductosEnPromocion()
            ]);

            this.promociones = Array.isArray(promos) ? promos : [];
            // Tomamos hasta 8 productos para la sección de destacados
            this.destacados = Array.isArray(todos) ? todos.slice(0, 8) : [];
        } catch (error) {
            console.error("Error al cargar productos en Home:", error);
        } finally {
            this.cargando = false;
        }
    }

    render() {
        return html`
      <main class="max-w-7xl mx-auto px-4 py-6 space-y-12">
        
        <!-- 1. Banner Ofertas de la semana -->
        <section class="relative bg-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-lg overflow-hidden flex flex-col items-center justify-center text-center gap-4 sm:gap-6">
          <h1 class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
            Ofertas de la semana
          </h1>
          <a href="/listado.html" class="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-slate-100 font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 text-sm sm:text-base">
            Ver Catálogo →
          </a>
        </section>

        <!-- Indicador de carga -->
        ${this.cargando
                ? html`
            <div class="flex flex-col items-center justify-center py-20 text-slate-500">
              <div class="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p class="text-sm font-medium">Cargando ofertas del supermercado...</p>
            </div>
          `
                : html`
            <!-- 2. Sección Promociones -->
            <section>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                Ofertas y Promociones
                  </h2>
                </div>
                <a href="/listado.html" class="text-indigo-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm">
                  Ver todas →
                </a>
              </div>

              <!-- Grilla de Tarjetas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                ${this.promociones.map(
                    (producto) => html`
                    <product-card .producto=${producto}></product-card>
                  `
                )}
              </div>
            </section>

            <!-- 3. Sección Productos Destacados -->
            <section>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                Productos Destacados
                  </h2>
                </div>
                <a href="/listado.html" class="text-indigo-600 hover:text-indigo-700 font-semibold text-xs sm:text-sm">
                  Ver más →
                </a>
              </div>

              <!-- Grilla de Tarjetas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                ${this.destacados.map(
                    (producto) => html`
                    <product-card .producto=${producto}></product-card>
                  `
                )}
              </div>
            </section>
          `
            }
      </main>
    `;
    }
}


customElements.define('pagina-home', PaginaHome);
if (!customElements.get('tp-medio-termino')) {
    customElements.define('tp-medio-termino', class extends PaginaHome { });
}

import { LitElement, html, css } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import '../carrito/carrito-boton.js';

export class AppHeader extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
        position: sticky;
        top:0;
        z-index: 50;
      }
    `
  ];

  render() {
    return html`
           
      <header class="bg-white/100">
        <!-- Navbar -->
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <!-- Logo Neutro -->
          <a href="/" class="flex items-center gap-2 text-decoration-none">
            <span class="bg-indigo-600 text-white font-black text-2xl tracking-tighter px-2.5 py-0.5 rounded-lg shadow-sm">
              SUPER
            </span>
            <span class="font-bold text-slate-800 tracking-wide text-lg hidden sm:inline">MERCADO</span>
          </a>

          <!-- Buscador -->
          <div class="flex-1 max-w-md hidden md:block">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Buscar" 
                class="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-slate-700"
              />
            </div>
          </div>

          <!-- Acciones derecha -->
          <div class="flex items-center gap-3">
            <a href="/listado.html" class="text-sm font-semibold text-slate-700 hover:text-indigo-600 hidden sm:inline">
              Catálogo
            </a>
            <carrito-boton></carrito-boton>
          </div>
        </div>

        <!-- Categorías -->
        <nav class="bg-slate-50 border-t border-slate-100 px-4 py-2 overflow-x-auto text-xs sm:text-sm font-medium text-slate-600 flex gap-4 sm:gap-6 justify-start md:justify-center">
          <a href="/" class="whitespace-nowrap">Inicio</a>
          <a href="/listado.html?categoria=325" class="hover:text-indigo-600 whitespace-nowrap">Verduras</a>
          <a href="/listado.html?categoria=326" class="hover:text-indigo-600 whitespace-nowrap">Carnes</a>
          <a href="/listado.html?categoria=327" class="hover:text-indigo-600 whitespace-nowrap">Higiene</a>
          <a href="/listado.html?categoria=328" class="hover:text-indigo-600 whitespace-nowrap">Limpieza</a>
          <a href="/listado.html" class="hover:text-indigo-600 text-slate-400 whitespace-nowrap">Ver todos →</a>
        </nav>
      </header>

    `;
  }
}

customElements.define('app-header', AppHeader);

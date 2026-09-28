// src/components/layout/app-header.js
import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import '../carrito/carrito-boton.js';

export class AppHeader extends LitElement {
    static styles = [tailwindStyles];

    render() {
        return html`
      <header class="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <!-- Barra superior roja estilo Coto -->
        <div class="bg-red-600 text-white text-xs py-1 px-4 text-center font-medium">
          🛒 Entregas en el día • Descuentos exclusivos con Comunidad Coto
        </div>

        <!-- Contenedor Principal Navbar -->
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <!-- Logo -->
          <a href="/" class="flex items-center gap-2 text-decoration-none">
            <span class="bg-red-600 text-white font-black text-2xl tracking-tighter px-2.5 py-0.5 rounded-lg shadow-sm">
              COTO
            </span>
            <span class="font-bold text-slate-800 tracking-wide text-lg hidden sm:inline">DIGITAL</span>
          </a>

          <!-- Buscador simulado -->
          <div class="flex-1 max-w-md hidden md:block">
            <div class="relative">
              <input 
                type="text" 
                placeholder="¿Qué producto estás buscando hoy?" 
                class="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-red-500 focus:bg-white text-slate-700"
              />
              <span class="absolute right-3 top-2.5 text-slate-400">🔍</span>
            </div>
          </div>

          <!-- Acciones derecha (Links y Botón de Carrito) -->
          <div class="flex items-center gap-3">
            <a href="/listado.html" class="text-sm font-semibold text-slate-700 hover:text-red-600 hidden sm:inline">
              Catálogo
            </a>
            <!-- Botón del carrito desarrollado por Barby -->
            <carrito-boton></carrito-boton>
          </div>
        </div>

        <!-- Barra inferior de navegación rápida / categorías -->
        <nav class="bg-slate-50 border-t border-slate-100 px-4 py-2 overflow-x-auto text-xs sm:text-sm font-medium text-slate-600 flex gap-4 sm:gap-6 justify-start md:justify-center">
          <a href="/" class="hover:text-red-600 text-red-600 font-bold whitespace-nowrap">Inicio</a>
          <a href="/listado.html?categoria=1" class="hover:text-red-600 whitespace-nowrap">Almacén</a>
          <a href="/listado.html?categoria=2" class="hover:text-red-600 whitespace-nowrap">Bebidas</a>
          <a href="/listado.html?categoria=3" class="hover:text-red-600 whitespace-nowrap">Frescos</a>
          <a href="/listado.html?categoria=4" class="hover:text-red-600 whitespace-nowrap">Limpieza</a>
          <a href="/listado.html" class="hover:text-red-600 text-slate-400 whitespace-nowrap">Ver todos →</a>
        </nav>
      </header>
    `;
    }
}

customElements.define('app-header', AppHeader);

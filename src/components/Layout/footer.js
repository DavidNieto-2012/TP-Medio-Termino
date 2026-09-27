// src/components/layout/app-footer.js
import { LitElement, html, css } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';

export class AppFooter extends LitElement {
    static styles = [
        tailwindStyles,
        css`
          :host {
            display: block;
            width: 100%;
          }
        `
    ];


    render() {
        return html`
           <footer class="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <!-- Logo Neutro -->
            <div class="flex items-center gap-2 mb-3">
              <span class="bg-indigo-600 text-white font-black text-xl px-2 py-0.5 rounded">SUPER</span>
              <span class="font-bold text-white text-base">MERCADO</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Trabajo Práctico de Medio Término - Programación Web 2 (UNTDF).
            </p>
          </div>

          <div>
            <h4 class="text-white font-semibold text-sm mb-3">Categorías</h4>
            <ul class="text-xs space-y-2 text-slate-400">
              <li><a href="/listado.html?categoria=1" class="hover:text-white">Almacén</a></li>
              <li><a href="/listado.html?categoria=2" class="hover:text-white">Bebidas</a></li>
              <li><a href="/listado.html?categoria=3" class="hover:text-white">Frescos</a></li>
              <li><a href="/listado.html?categoria=4" class="hover:text-white">Limpieza</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold text-sm mb-3">Integrantes - Grupo 6</h4>
            <ul class="text-xs space-y-1 text-slate-400">
              <li>Garcia Schmidt, Barbara</li>
              <li>Santillan, Rodrigo Jesus</li>
              <li>Nieto, David</li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold text-sm mb-3">Medios de Pago</h4>
            <p class="text-xs text-slate-400 mb-2">Aceptamos todas las tarjetas de crédito, débito y transferencias.</p>
            <div class="flex gap-2 text-lg">💳 🏦 📱</div>
          </div>
        </div>

        <div class="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © ${new Date().getFullYear()} Supermercado Web - TP Medio Término.
        </div>
      </footer>

    `;
    }
}

customElements.define('app-footer', AppFooter);

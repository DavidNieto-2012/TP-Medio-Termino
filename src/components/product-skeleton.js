import { LitElement, html } from 'lit';
import tailwindStyles from './base/tailwind-element.js';

class ProductSkeleton extends LitElement {
  static styles = [tailwindStyles];

  render() {
    return html`
      <div class="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 animate-pulse flex flex-col justify-between h-80">
        <div class="w-full h-40 bg-slate-700/60 rounded-xl mb-4"></div>
        <div class="h-5 bg-slate-700/60 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-slate-700/60 rounded w-1/2 mb-4"></div>
        <div class="flex justify-between items-center pt-3 border-t border-slate-700/40">
          <div class="h-6 bg-slate-700/60 rounded w-1/3"></div>
          <div class="h-8 bg-slate-700/60 rounded-xl w-1/3"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('product-skeleton', ProductSkeleton);
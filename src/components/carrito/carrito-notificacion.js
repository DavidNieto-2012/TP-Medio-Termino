import { LitElement, html, css } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';

class CarritoNotificacion extends LitElement {
  static properties = {
    mensaje: { type: String },
    carritoAbierto: { type: Boolean }
  };

  static styles = [
    tailwindStyles,
    css`
      :host {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1100;
        pointer-events: none;
      }

      .notificacion {
        max-width: calc(100vw - 2rem);
        animation: aparecer 180ms ease-out;
      }

      .mensaje {
        overflow-wrap: anywhere;
      }

      @keyframes aparecer {
        from { opacity: 0; transform: translateY(-0.5rem); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        .notificacion { animation: none; }
      }
    `
  ];

  constructor() {
    super();
    this.mensaje = '';
    this.carritoAbierto = false;
    this._temporizador = null;
    this._alAgregar = this._alAgregar.bind(this);
    this._alCambiarEstadoCarrito = this._alCambiarEstadoCarrito.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('producto-agregado', this._alAgregar);
    window.addEventListener('carrito-estado-cambiado', this._alCambiarEstadoCarrito);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('producto-agregado', this._alAgregar);
    window.removeEventListener('carrito-estado-cambiado', this._alCambiarEstadoCarrito);
    clearTimeout(this._temporizador);
  }

  _alCambiarEstadoCarrito(evento) {
    this.carritoAbierto = evento.detail?.abierto === true;
    if (this.carritoAbierto) this._cerrar();
  }

  _alAgregar(evento) {
    if (this.carritoAbierto) return;

    const nombre = evento.detail?.producto?.title;
    this.mensaje = nombre
      ? `Se agregó "${nombre}" correctamente al carrito.`
      : 'Producto agregado correctamente al carrito.';
    clearTimeout(this._temporizador);
    this._temporizador = setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  _cerrar() {
    clearTimeout(this._temporizador);
    this.mensaje = '';
  }

  render() {
    if (!this.mensaje) return html``;

    return html`
      <div class="notificacion flex items-center gap-3 max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-lg pointer-events-auto" role="status" aria-live="polite">
        <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700" aria-hidden="true">✓</span>
        <span class="mensaje">${this.mensaje}</span>
        <button class="ml-auto shrink-0 cursor-pointer border-0 bg-transparent text-xl leading-none text-slate-500 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600" type="button" aria-label="Cerrar notificación" @click=${this._cerrar}>×</button>
      </div>
    `;
  }
}

customElements.define('carrito-notificacion', CarritoNotificacion);
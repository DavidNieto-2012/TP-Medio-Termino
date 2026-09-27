import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js';
import { obtenerTotalesCarrito } from '../../cart.js';


class CarritoBoton extends LitElement {
    static styles = [tailwindStyles];

    static properties = {
        cantidad: { type: Number },
    };

    constructor() {
        super();
        this.cantidad = 0;  //cantidad de productos en el carrito
    }

    // función que se ejecuta cuando se dispara el evento 'carrito-actualizado'
    _actualizarCantidad = () => {
        const totales = obtenerTotalesCarrito();
        this.cantidad = totales.cantidadTotal;
    }

    // se ejecuta cuando el componente se agrega al DOM
    connectedCallback() {
        super.connectedCallback();
        this._actualizarCantidad(); // carga inicial, reusando la misma función
        window.addEventListener('carrito-actualizado', this._actualizarCantidad);
    }

    // se ejecuta cuando el componente se elimina del DOM
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('carrito-actualizado', this._actualizarCantidad)
    }

    render() {
        return html`
        <button class="carrito-boton" type="button" aria-label="Ver carrito" 
            title="Ver carrito"
            @click=${this._onClick}
        >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="18" r="1.5"></circle>
            <circle cx="17" cy="18" r="1.5"></circle>
            <path d="M3 4h2l2.4 9.5a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7"></path>
        </svg>
        <span class="badge">${this.cantidad}</span>
        </button>
    `;
    }

    _onClick() {
        this.dispatchEvent(new CustomEvent('carrito-abrir', {
            bubbles: true,
            composed: true,   //permite que el evento cruce el límite del Shadow DOM
        }));
    }
}

customElements.define('carrito-boton', CarritoBoton);
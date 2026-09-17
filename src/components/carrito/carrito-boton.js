import { LitElement, html } from 'lit';
import tailwindStyles from '../base/tailwind-element.js'

class CarritoBoton extends LitElement {
    static styles = [tailwindStyles];

    constructor() {
        super();
    }  

    render() {
        return html`
        <button class="btn">
            Ver Carrito
        </button>
        `;
    }
}

customElements.define('carrito-boton', CarritoBoton);
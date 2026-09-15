import { LitElement, css, html } from 'lit';

class TpMedioTermino extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Inter, 'Segoe UI', sans-serif;
      color: #e2e8f0;
    }

    .card {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(148, 163, 184, 0.3);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.3);
    }

    h1 {
      margin: 0 0 1rem;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1.1;
    }

    p {
      margin: 0 0 1.5rem;
      color: #cbd5e1;
      font-size: 1.05rem;
    }

    button {
      border: none;
      border-radius: 999px;
      background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
      color: white;
      font-size: 1rem;
      padding: 0.9rem 1.5rem;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.35);
    }

    button:hover {
      transform: translateY(-1px);
    }
  `;

  static properties = {
    count: { type: Number },
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <div class="card">
        <h1>Proyecto con Lit</h1>
        <p>Este componente funciona con Lit y Vite. Presioná el botón para probar reactividad.</p>
        <button @click=${this._increment}>Contador: ${this.count}</button>
      </div>
    `;
  }

  _increment() {
    this.count += 1;
  }
}

customElements.define('tp-medio-termino', TpMedioTermino);

// Clase base que inyecta los estilos de Tailwind en el Shadow DOM 
// de los componentes que la heredan.

import styles from './index.css?inline'
const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
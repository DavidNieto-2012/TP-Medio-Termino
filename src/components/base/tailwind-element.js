// Clase base que inyecta los estilos de Tailwind en el Shadow DOM 
// de los componentes que la heredan.

// 1ro ?inline Genera el contenido del css como texto
import styles from '../../index.css?inline'
import stylesCarro from '../../styles/carrito.css?inline'

// 2do Crea una hoja de estilos CSS con el contenido del css
const tailwindStyles = new CSSStyleSheet();

//3ro Inyecta los estilos de Tailwind en la hoja de estilos
tailwindStyles.replaceSync(`
    ${styles}
    ${stylesCarro}
`);

// Exporta la clase base que extiende de LitElement y aplica los estilos de Tailwind
export default tailwindStyles;

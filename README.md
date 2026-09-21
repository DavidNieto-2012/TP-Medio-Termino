# Grupo 6: 
- Garcia Schmidt, Barbara
- Santillan, Rodrigo Jesus
- Nieto, David

## Tecnologías utilizadas


## Página de inspiración
https://www.coto.com.ar/
usuario de prueba: Grupo6
clave: Grupo6

## Cómo ejecutar el proyecto
  Ejecutá: npm run dev
  Abrí la URL: http://localhost:5173/
  Presioná Ctrl + Shift + R para forzar recarga.


## REPARTO DE ACTIVIDADES

### Etapa 1: Funcionalidades (Lógica, API y Persistencia)

Integrante 1 RODRI: Estado y Persistencia del Carrito
-Crear el módulo JS para manipular localStorage con setItem y getItem.  
-programar las funciones core: agregar producto, quitar producto, vaciar carrito y cálculo de totales (cantidad y precio).  
-Establecer el sistema de eventos (Custom Events) para que cualquier parte de la app avise al carrito cuando se modifica un ítem.  


Integrante 2 BARBY: Servicios de API y Lógica de Home

-Crear el módulo/helper de fetch para consumir los endpoints GET de la API [https://ecommerce.fedegonzalez.com/docs].  LISTO
-Implementar la petición al endpoint /products para obtener el catálogo completo.  LISTO
-Desarrollar la lógica de filtrado en JS para seleccionar qué mostrar en Home (etiquetas de destacado, promoción o mostrar_en_home).  LISTO

Integrante 3 DAVID: Enrutamiento por URL y Filtros Dinámicos

-Implementar la lectura de parámetros en listado.html usando new URLSearchParams(window.location.search) para capturar categoria. 
-Crear la lógica para filtrar en JavaScript el listado general de /products según el ID de categoría obtenido. 
-Implementar la lectura de producto en ficha.html con URLSearchParams y la llamada puntual a la API con /products/{id}.  


### Etapa 2: Renderizado (Componentes Lit, TailwindCSS y Mobile-First)


Integrante 1 BARBY: Componentes del Carrito y Setup Base

-Inicializar el proyecto con Vite, Lit y TailwindCSS, armando el README.md grupal en GitHub.  LISTO
-Desarrollar en Lit el componente visual del Carrito (drawer/modal o sección detallada) con los totales y el botón de vaciar. LISTO
-Crear el botón/badge del carrito para el header que actualice dinámicamente la cantidad de productos visibles.  LISTO
-Maquetar todo con Tailwind asegurando diseño mobile-first.  LISTO


Integrante 2 DAVID: Estructura Global, Home y Card Reutilizable

-Crear los componentes compartidos: Header/Navbar y Footer responsivos con Tailwind.  
-Diseñar y programar el componente Lit <product-card> (imagen, título, precio, enlace a ficha y botón de agregar al carrito).  
-Renderizar la página index.html estructurando las secciones de promociones/destacados con Tailwind.  


Integrante 3 RODRI: Vistas de Listado y Ficha de Detalle
-Maquetar y renderizar listado.html mostrando la grilla responsiva de productos con Tailwind y reutilizando <product-card>.  
-Diseñar y programar en Lit la vista completa de ficha.html (galería/foto principal, descripción completa, precio y botón de compra).  
-Implementar estados visuales de carga (loaders) y mensaje de "categoría vacía" adaptados a pantallas móviles y desktop.  

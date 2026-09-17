// Configuración base de conexión con la API

// El valor de las constantes se obtienen de las variables de entorno definidas en el archivo .env
export const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


export function crearHeaders() {                    //Genera el objeto de headers (cabeceras HTTP) que se usa en las peticiones fetch
  return {
    Authorization: `Bearer ${API_TOKEN}`,           //envía el token de autenticación
    "Content-Type": "application/json",             //le avisa al servidor que el cuerpo (body) de la petición viene en formato JSON.
  };
}


export async function procesarRespuesta(respuesta) {    //Recibe el objeto respuesta que devuelve un fetch()
  const texto = await respuesta.text();                 //lee el cuerpo de la respuesta como texto plano
  const datos = texto ? JSON.parse(texto) : null;       //si hay texto, lo convierte a objeto JS, si no guarda null

  if (!respuesta.ok) {              //si la respuesta no es satisfactoria (código HTTP distinto de 2xx) intenta usar  datos?.detail para mostrar un mensaje de error más específico, si no lo hay, muestra el código de error
    throw new Error(datos?.detail || `Error ${respuesta.status}`);
  }

  return datos;
}

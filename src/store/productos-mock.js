// Productos de prueba
// Este archivo es temporal: se elimina cuando el servicio de API esté mergeado.

export const productosMock = [
  {
    id: 1,
    title: "Leche entera La Serenísima 1L",
    description: "Leche entera larga vida, sachet de 1 litro.",
    price: 1450,
    category_id: 3,
    pictures: ["https://picsum.photos/seed/leche/300/300"],
    category: {
      id: 3,
      title: "Lácteos",
      description: "Leches, yogures y quesos",
      picture: "https://picsum.photos/seed/lacteos/100/100",
    },
    tags: ["destacado"],
  },
  {
    id: 2,
    title: "Fideos Matarazzo Tirabuzón 500g",
    description: "Fideos secos tipo tirabuzón, paquete de 500 gramos.",
    price: 980,
    category_id: 5,
    pictures: ["https://picsum.photos/seed/fideos/300/300"],
    category: {
      id: 5,
      title: "Almacén",
      description: "Fideos, arroz, harinas y conservas",
      picture: "https://picsum.photos/seed/almacen/100/100",
    },
    tags: [],
  },
  {
    id: 3,
    title: "Gaseosa Coca-Cola 2.25L",
    description: "Gaseosa cola, botella descartable de 2.25 litros.",
    price: 2300,
    category_id: 7,
    pictures: ["https://picsum.photos/seed/gaseosa/300/300"],
    category: {
      id: 7,
      title: "Bebidas",
      description: "Gaseosas, jugos y aguas",
      picture: "https://picsum.photos/seed/bebidas/100/100",
    },
    tags: ["promoción"],
  },
];
export const CATEGORIAS = [
  {
    label: 'Motor',
    subs: [
      'Coches', 'Todoterreno', 'Coches clásicos', 'Coches sin carnet',
      'Motos', 'Furgonetas', 'Camiones', 'Autobuses',
      'Caravanas', 'Autocaravanas', 'Quads', 'Buggies',
      'Karts', 'Tuning', 'Maquinaria',
      'Recambios y accesorios', 'Otros de motor',
    ],
  },
  {
    label: 'Inmobiliaria',
    subs: ['Pisos', 'Casas', 'Locales', 'Garajes', 'Terrenos', 'Oficinas', 'Trasteros'],
  },
  {
    label: 'Informática',
    subs: ['Portátiles', 'Ordenadores', 'Componentes', 'Periféricos', 'Impresoras', 'Tablets'],
  },
  {
    label: 'Imagen y Sonido',
    subs: ['TV', 'Audio', 'Cámaras', 'Proyectores', 'Reproductores', 'Accesorios AV'],
  },
  {
    label: 'Telefonía',
    subs: ['Móviles', 'Tablets', 'Smartwatches', 'Accesorios telefonía'],
  },
  {
    label: 'Juegos',
    subs: ['Consolas', 'Videojuegos', 'Juegos de mesa', 'Cartas coleccionables'],
  },
  {
    label: 'Casa y Jardín',
    subs: ['Muebles', 'Electrodomésticos', 'Jardín', 'Iluminación', 'Decoración', 'Bricolaje'],
  },
  {
    label: 'Moda y complementos',
    subs: ['Ropa hombre', 'Ropa mujer', 'Ropa niño', 'Calzado', 'Bolsos y mochilas', 'Joyería y relojes'],
  },
  {
    label: 'Bebés',
    subs: ['Ropa bebé', 'Carricoches', 'Juguetes bebé', 'Mobiliario bebé', 'Alimentación bebé'],
  },
  {
    label: 'Deportes y náutica',
    subs: ['Ciclismo', 'Fitness', 'Natación', 'Montaña y escalada', 'Náutica', 'Fútbol', 'Otros deportes'],
  },
  {
    label: 'Aficiones y ocio',
    subs: ['Libros', 'Música', 'Coleccionismo', 'Arte y manualidades', 'Instrumentos musicales', 'Fotografía'],
  },
  {
    label: 'Mascotas y agricultura',
    subs: ['Perros', 'Gatos', 'Aves', 'Peces y reptiles', 'Maquinaria agrícola', 'Plantas y semillas'],
  },
  {
    label: 'Servicios',
    subs: ['Reformas y construcción', 'Limpieza', 'Clases particulares', 'Transporte y mudanzas', 'Otros servicios'],
  },
  {
    label: 'Formación y libros',
    subs: ['Libros de texto', 'Cursos', 'Idiomas', 'Informática y tecnología', 'Otros libros'],
  },
  {
    label: 'Otros',
    subs: ['Sin categoría'],
  },
];

// Campos dinámicos que aparecen según la categoría elegida
export const CAMPOS_EXTRA = {
  Motor: [
    { key: 'km',           label: 'Kilómetros',    type: 'number',  placeholder: '87000',  unit: 'km' },
    { key: 'anio',         label: 'Año',           type: 'number',  placeholder: '2018'              },
    { key: 'combustible',  label: 'Combustible',   type: 'select',
      options: ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico', 'GLP', 'Otro'] },
    { key: 'cv',           label: 'Potencia (CV)', type: 'number',  placeholder: '110'               },
  ],
  Inmobiliaria: [
    { key: 'metros',        label: 'm²',             type: 'number', placeholder: '80',  unit: 'm²' },
    { key: 'habitaciones',  label: 'Habitaciones',   type: 'number', placeholder: '3'               },
    { key: 'anio',          label: 'Año construc.',  type: 'number', placeholder: '2005'            },
    { key: 'banos',         label: 'Baños',          type: 'number', placeholder: '1'               },
  ],
};

// Función helper: dado un key de extra y su valor, devuelve texto legible para la tarjeta
export function formatExtra(extras) {
  if (!extras || typeof extras !== 'object') return null;
  const parts = [];
  if (extras.km)     parts.push(`${Number(extras.km).toLocaleString('es-ES')} km`);
  if (extras.metros) parts.push(`${extras.metros} m²`);
  if (extras.anio)   parts.push(extras.anio);
  if (extras.combustible) parts.push(extras.combustible);
  if (extras.habitaciones) parts.push(`${extras.habitaciones} hab.`);
  return parts.length ? parts.join(' · ') : null;
}

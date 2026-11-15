export const pages = {
  home: {
    path: '/', label: 'Inicio',
    title: 'Frutas y verduras al por mayor en Lima | VEGANFRESH',
    description: 'Consulta frutas y verduras al por mayor para empresas en Lima. Envía productos, cantidades y zona de atención para evaluar una cotización.',
    h1: 'Frutas y verduras al por mayor para empresas en Lima.',
  },
  productos: {
    path: '/productos/', label: 'Productos',
    title: 'Catálogo de frutas y verduras al por mayor | VEGANFRESH',
    description: 'Explora grupos y ejemplos de frutas y verduras por los que puedes consultar. VEGANFRESH prepara cotizaciones mayoristas para empresas de Lima.',
    h1: 'Productos de frutas y verduras para cotizar al por mayor.',
  },
  frutas: {
    path: '/frutas-al-por-mayor/', label: 'Frutas',
    title: 'Frutas al por mayor para empresas en Lima | VEGANFRESH',
    description: 'Consulta frutas al por mayor para tu empresa en Lima. Indica variedades, cantidades y frecuencia estimada para solicitar una cotización.',
    h1: 'Frutas al por mayor para empresas en Lima.',
  },
  verduras: {
    path: '/verduras-al-por-mayor/', label: 'Verduras',
    title: 'Verduras al por mayor para empresas en Lima | VEGANFRESH',
    description: 'Solicita una cotización mayorista de verduras y hortalizas para tu negocio en Lima. Detalla productos, cantidades y frecuencia.',
    h1: 'Verduras al por mayor para empresas en Lima.',
  },
  restaurantes: {
    path: '/proveedor-restaurantes/', label: 'Para restaurantes',
    title: 'Proveedor de frutas y verduras para restaurantes | VEGANFRESH',
    description: 'Cotiza frutas y verduras para restaurantes y cadenas gastronómicas de Lima. Describe productos, cantidades, distritos y frecuencia de compra.',
    h1: 'Frutas y verduras al por mayor para restaurantes.',
  },
  cotizar: {
    path: '/cotizar/', label: 'Cotizaciones',
    title: 'Solicitar cotización mayorista | VEGANFRESH',
    description: 'Envía tu solicitud de cotización empresarial indicando frutas o verduras, cantidades y zona de atención.',
    h1: 'Solicita una cotización mayorista.',
  },
  privacidad: {
    path: '/privacidad/', label: 'Política de privacidad',
    title: 'Política de privacidad | VEGANFRESH',
    description: 'Conoce los criterios de tratamiento de información recibida mediante formularios de VEGANFRESH.',
    h1: 'Política de privacidad.',
  },
  missing: {
    path: '/404', label: 'Página no encontrada',
    title: 'Página no encontrada | VEGANFRESH',
    description: 'No encontrada',
    h1: 'Aquí no encontramos esa página.',
  },
} as const;

export type PageKey = keyof typeof pages;
export type CommercialSubpage = 'productos' | 'frutas' | 'verduras' | 'restaurantes';
export const primaryNavigation = ['home', 'productos', 'frutas', 'verduras', 'restaurantes'] as const;
export const breadcrumbLabels: Record<CommercialSubpage, string> = {
  productos: 'Productos', frutas: 'Frutas', verduras: 'Verduras', restaurantes: 'Restaurantes',
};

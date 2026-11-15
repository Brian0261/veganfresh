export const fixture = {
  companyName: 'Empresa de prueba',
  contactName: 'Contacto de prueba',
  email: 'compras@example.test',
  phone: '+51 900 000 000',
  businessType: 'restaurant_chain',
  district: 'Cercado de Lima',
  productsAndQuantities: 'Naranjas: 30 kg de prueba.',
  frequency: 'weekly',
  locationCount: 2,
  privacyAcknowledged: true,
  turnstileToken: 'local-test-pass',
};

export const skin = [
  ['home', '/', 200],
  ['productos', '/productos/', 200],
  ['frutas', '/frutas-al-por-mayor/', 200],
  ['verduras', '/verduras-al-por-mayor/', 200],
  ['restaurantes', '/proveedor-restaurantes/', 200],
  ['cotizar', '/cotizar/', 200],
  ['privacidad', '/privacidad/', 200],
  ['404', '/ruta-inexistente/', 404],
] as const;

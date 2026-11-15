// Distritos de la provincia de Lima. Lista geográfica para cotizar, sujeta a evaluación comercial.
export const districts = [
  'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Cercado de Lima', 'Chaclacayo',
  'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María',
  'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín',
  'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre',
  'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja',
  'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis',
  'San Martín de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar',
  'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo',
] as const;

const key = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ');
const byName = new Map<string, string>(districts.map(district => [key(district), district]));
byName.set('lima', 'Cercado de Lima');
byName.set('lima cercado', 'Cercado de Lima');
byName.set('chosica', 'Lurigancho');

export const normalizeDistrict = (value: string) => byName.get(key(value));

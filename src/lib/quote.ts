export const businessTypes = {
  restaurant: 'Restaurante', restaurant_chain: 'Cadena de restaurantes', catering: 'Catering',
  hotel: 'Hotel', corporate_dining: 'Comedor corporativo', other: 'Otro negocio',
};
export const frequencies = {
  once: 'Compra puntual', weekly: 'Semanal', multiple_weekly: 'Varias veces por semana',
  other: 'Otra', unknown: 'Por definir',
};
export const sourcePages = {
  productos: '/productos/', restaurantes: '/proveedor-restaurantes/',
  frutas: '/frutas-al-por-mayor/', verduras: '/verduras-al-por-mayor/',
};
export const messages = {
  required: 'Completa este campo para enviar la solicitud.',
  email: 'Escribe una dirección de correo válida.',
  phone: 'Añade un número donde podamos contactar a tu empresa.',
  products: 'Indica al menos un producto y su cantidad aproximada.',
  privacy: 'Confirma que has leído el aviso de privacidad.',
  challenge: 'No pudimos verificar la solicitud. Intenta de nuevo.',
  fields: 'Revisa los campos señalados para enviar la solicitud.',
  submitting: 'Enviando solicitud…',
  success: 'Recibimos tu solicitud de cotización.',
  followUp: 'Nuestro equipo evaluará la información. Los tiempos de respuesta se confirmarán por el canal comercial.',
  unavailable: 'No pudimos confirmar la recepción. Revisa tu conexión y vuelve a intentarlo. Tus datos continúan en el formulario.',
  limited: 'Has realizado varios intentos. Espera un momento antes de enviar otra solicitud.',
  conflict: 'Los datos cambiaron desde el intento anterior. Revisa la solicitud y vuelve a enviarla.',
};

const fieldNames = [
  'companyName', 'contactName', 'email', 'phone', 'businessType', 'district', 'productsAndQuantities',
  'frequency', 'locationCount', 'comments', 'privacyAcknowledged', 'turnstileToken', 'website', 'source',
] as const;
const allowedFields = new Set<string>(fieldNames);
export type QuoteField = typeof fieldNames[number];
type FieldErrors = Partial<Record<QuoteField, string>>;

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().normalize('NFC') : '';
}

export function validateQuote(input: unknown) {
  const errors: FieldErrors = {};
  if (!input || typeof input !== 'object' || Array.isArray(input) ||
      Object.keys(input).some(key => !allowedFields.has(key))) return { errors };

  const values = input as Partial<Record<QuoteField, unknown>>;
  if (values.website !== undefined && values.website !== '') return { errors };

  const text = (key: QuoteField, min: number, max: number, message = messages.required) => {
    const value = clean(values[key]);
    const optional = min === 0 && values[key] === undefined;
    if (!optional && (typeof values[key] !== 'string' || value.length < min || value.length > max ||
        /[\p{Cc}\p{Cf}]/u.test(value.replace(/[\n\r\t]/g, '')))) errors[key] = message;
    return value;
  };

  const companyName = text('companyName', 2, 120);
  const contactName = text('contactName', 2, 100);
  const email = text('email', 3, 254, messages.email).toLowerCase();
  if (!/^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/.test(email)) errors.email = messages.email;

  const phone = text('phone', 7, 20, messages.phone);
  if (!/^\+?[0-9 ()-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7) errors.phone = messages.phone;

  const businessType = text('businessType', 1, 32);
  if (!Object.hasOwn(businessTypes, businessType)) errors.businessType = messages.required;

  const districtMessage = 'Indica un distrito de atención válido.';
  const district = normalizeDistrict(text('district', 2, 60, districtMessage));
  if (!district) errors.district = districtMessage;

  const productsAndQuantities = text('productsAndQuantities', 10, 2000, messages.products);
  const frequency = text('frequency', 0, 32, 'Selecciona una frecuencia válida.');
  if (frequency && !Object.hasOwn(frequencies, frequency)) errors.frequency = 'Selecciona una frecuencia válida.';

  const locationCount = values.locationCount ?? null;
  if (values.locationCount !== undefined && (typeof values.locationCount !== 'number' ||
      !Number.isInteger(locationCount) || values.locationCount < 1 || values.locationCount > 100)) {
    errors.locationCount = 'Indica un número entero entre 1 y 100.';
  }
  const comments = text('comments', 0, 1000, 'Escribe hasta 1000 caracteres.');
  if (values.privacyAcknowledged !== true) errors.privacyAcknowledged = messages.privacy;

  const turnstileToken = text('turnstileToken', 1, 2048, messages.challenge);
  const source = text('source', 0, 24);
  if (source && !Object.hasOwn(sourcePages, source)) errors.source = messages.fields;

  if (!district || Object.keys(errors).length) return { errors };
  return {
    errors,
    data: {
      companyName, contactName, email, phone, businessType, district, productsAndQuantities,
      frequency: frequency || null,
      locationCount: typeof locationCount === 'number' ? locationCount : null,
      comments: comments || null,
      sourcePage: Object.hasOwn(sourcePages, source) ? sourcePages[source as keyof typeof sourcePages] : null,
    },
    turnstileToken,
  };
}
import { normalizeDistrict } from '../config/districts.ts';

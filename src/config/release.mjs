// Actualizar bajo revisión comercial, jurídica y técnica (ver DEPLOYMENT_RUNBOOK.md).
export const release = Object.freeze({
  origin: '',
  commercialApproval: '',
  legalApproval: '',
  technicalApproval: '',
  privacyNoticeVersion: '',
  indexablePaths: Object.freeze(/** @type {string[]} */ ([])),
});

export const commercialPaths = Object.freeze([
  '/', '/productos/', '/frutas-al-por-mayor/', '/verduras-al-por-mayor/', '/proveedor-restaurantes/',
]);

/** @param {typeof release} configuration @param {boolean} privacyApproved */
export function getReleaseState(configuration, privacyApproved) {
  let origin = null;
  try {
    const url = new URL(configuration.origin);
    if (url.protocol === 'https:' && url.origin === configuration.origin &&
        url.port === '' && /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(url.hostname) &&
        !/(?:^|\.)(localhost|test|example|invalid|local|workers\.dev|pages\.dev)$/.test(url.hostname) &&
        !/(?:^|\.)example\.(?:com|net|org)$/.test(url.hostname) && !/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) {
      origin = url.origin;
    }
  } catch {
    // No hay dominio confirmado.
  }
  const approved = Boolean(origin && privacyApproved && configuration.commercialApproval.trim() &&
    configuration.legalApproval.trim() && configuration.technicalApproval.trim() &&
    configuration.privacyNoticeVersion.trim());
  return {
    origin,
    approved,
    indexablePaths: approved ? commercialPaths.filter(path => configuration.indexablePaths.includes(path)) : [],
  };
}

export const privacyApproved = false; // TODO_LEGAL: sustituir el borrador versionado antes de cambiar este valor.
const state = getReleaseState(release, privacyApproved);
export const siteOrigin = state.origin;
export const releaseReady = state.approved;
export const indexablePaths = state.indexablePaths;

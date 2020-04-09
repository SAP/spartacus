//TODO: more to come
export const occ = {
  apiUrl: Cypress.env('API_URL'),
  prefix: Cypress.env('OCC_PREFIX'),
};
export const baseSite = '/electronics-spa';
export const prefixAndBaseSite = occ.prefix + baseSite;
export const apiUrlAndPrefix = occ.apiUrl + occ.prefix;
export const baseEndpoint = occ.apiUrl + prefixAndBaseSite;

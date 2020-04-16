//TODO: more to come
export const occ = {
  apiUrl: Cypress.env('API_URL'),
  prefix: Cypress.env('OCC_PREFIX'),
};
export const newBaseSite = Cypress.env('BASE_SITE');
export const prefixAndBaseSite = occ.prefix + newBaseSite;
export const apiUrlAndPrefix = occ.apiUrl + occ.prefix;
export const baseEndpoint = occ.apiUrl + prefixAndBaseSite;

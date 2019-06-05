export const BASE_URL = Cypress.config().baseUrl;
export const LANGUAGE_REQUEST = `${Cypress.env(
  'API_URL'
)}/rest/v2/electronics-spa/languages?lang=en&curr=USD`;
export const CURRENCY_REQUEST = `${Cypress.env(
  'API_URL'
)}/rest/v2/electronics-spa/currencies?lang=en&curr=USD`;
export const CONTENT_CATALOG = 'electronics-spa';
export const CURRENCY_USD = 'USD';
export const CURRENCY_JPY = 'JPY';
export const LANGUAGE_EN = 'en';
export const LANGUAGE_JA = 'ja';
export const PRODUCT_ID = '280916';
export const FULL_BASE_URL_EN = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_EN}`;
export const FULL_BASE_URL_JA = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_JA}`;
export const PRODUCT_URL_EN = `${FULL_BASE_URL_EN}/${CURRENCY_USD}/product/${PRODUCT_ID}`;
export const PRODUCT_URL_JA = `${FULL_BASE_URL_JA}/${CURRENCY_USD}/product/${PRODUCT_ID}`;
export const PRODUCT_URL_USD = `${FULL_BASE_URL_EN}/${CURRENCY_USD}/product/${PRODUCT_ID}`;
export const PRODUCT_URL_JPY = `${FULL_BASE_URL_EN}/${CURRENCY_JPY}/product/${PRODUCT_ID}`;
``;

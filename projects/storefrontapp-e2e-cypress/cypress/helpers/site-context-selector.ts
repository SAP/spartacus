import { switchSiteContext } from '../support/utils/switch-site-context';

export const LANGUAGES = 'languages';
export const CURRENCIES = 'currencies';
export const LANGUAGE_LABEL = 'Language';
export const CURRENCY_LABEL = 'Currency';

export const BASE_URL = Cypress.config().baseUrl;
export const CONTENT_CATALOG = 'electronics-spa';
export const CURRENCY_USD = 'USD';
export const CURRENCY_JPY = 'JPY';
export const LANGUAGE_EN = 'en';
export const LANGUAGE_DE = 'de';

export const LANGUAGE_REQUEST = `${Cypress.env(
  'API_URL'
)}/rest/v2/${CONTENT_CATALOG}/languages?lang=${LANGUAGE_EN}&curr=${CURRENCY_USD}`;
export const CURRENCY_REQUEST = `${Cypress.env(
  'API_URL'
)}/rest/v2/${CONTENT_CATALOG}/currencies?lang=${LANGUAGE_EN}&curr=${CURRENCY_USD}`;

export const FULL_BASE_URL_EN_USD = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_EN}/${CURRENCY_USD}`;
export const FULL_BASE_URL_EN_JPY = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_EN}/${CURRENCY_JPY}`;
export const FULL_BASE_URL_DE_USD = `${BASE_URL}/${CONTENT_CATALOG}/${LANGUAGE_DE}/${CURRENCY_USD}`;

const PRODUCT_ID_1 = '280916';
const PRODUCT_ID_2 = '1687508';
export const PRODUCT_NAME_CART_DE = 'Digitalkamera';
export const PRODUCT_NAME_DETAILS_DE = 'Stativ mit Fernbedienung';
export const PRODUCT_NAME_SEARCH_DE =
  'FUN Einwegkamera mit Blitz, 27+12 Bilder';
export const TITLE_DE = 'Herr';
export const MONTH_DE = 'Juni';

export const PRODUCT_PATH_1 = `/product/${PRODUCT_ID_1}`;
export const PRODUCT_PATH_2 = `/product/${PRODUCT_ID_2}`;
export const CART_PATH = '/cart';
const myAccount = 'my-account';
export const ADDRESS_BOOK_PATH = `/${myAccount}/address-book`;
export const CLOSE_ACCOUNT_PATH = `/${myAccount}/close-account`;
export const CONSENT_MANAGEMENT_PATH = `/${myAccount}/consents`;
export const ORDER_PATH = `/${myAccount}/orders`;
export const PAYMENT_DETAILS_PATH = `/${myAccount}/payment-details`;
export const PERSONAL_DETAILS_PATH = `/${myAccount}/update-profile`;
export const UPDATE_EMAIL_PATH = `/${myAccount}/update-email`;
export const UPDATE_PASSWORD_PATH = `/${myAccount}/update-password`;
export const PRODUCT_SEARCH_PATH =
  '/Open-Catalogue/Cameras/Film-Cameras/c/574?pageSize=10&categoryCode=574&query=:relevance:category:574';
export const REGISTRATION_PATH = '/login/register';

export function createGerericQuery(request: string, alias: string): void {
  cy.route(request).as(alias);
}

export function stub(request: string, alias: string): void {
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.server();
    createGerericQuery(request, alias);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
}

export function languageChange(sitePath: string): void {
  cy.visit(FULL_BASE_URL_EN_USD + sitePath);
  cy.wait(`@${LANGUAGES}`);
  switchSiteContext(LANGUAGE_DE, LANGUAGE_LABEL);
}

export function currencyChange(sitePath: string): void {
  cy.visit(FULL_BASE_URL_EN_USD + sitePath);
  cy.wait(`@${CURRENCIES}`);
  switchSiteContext(CURRENCY_JPY, CURRENCY_LABEL);
}

export function verifyLanguageChange(sitePath: string): void {
  languageChange(sitePath);

  cy.url().should('eq', FULL_BASE_URL_DE_USD + sitePath);
}

export function verifyCurrencyChange(sitePath: string): void {
  currencyChange(sitePath);

  cy.url().should('eq', FULL_BASE_URL_EN_JPY + sitePath);
}

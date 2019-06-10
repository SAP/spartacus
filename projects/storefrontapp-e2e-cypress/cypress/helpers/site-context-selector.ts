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

export const PRODUCT_PATH = '/product/280916';

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

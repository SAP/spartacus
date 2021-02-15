import {
  CMS_CART_PAGE,
  CMS_DELIVERY_PAGE,
  CMS_HOMEPAGE,
  CMS_LOGIN_PAGE,
  CMS_LOGOUT_PAGE,
  CMS_PAYMENT_PAGE,
  CMS_REGISTER_PAGE,
  CMS_REVIEW_PAGE,
  CMS_SHIPPING_ADDRESS_PAGE,
} from '../helpers/interceptors';

const base_sites = `@(electronics-spa|apparel-uk-spa|powertools-spa)`;

// Register commonly used interceptors
function registerInterceptors() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    path: `${Cypress.env(
      'OCC_PREFIX'
    )}/${base_sites}/cms/pages?lang=en&curr=USD`,
  }).as(CMS_HOMEPAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/login',
    },
  }).as(CMS_LOGIN_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/login/register',
    },
  }).as(CMS_REGISTER_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/logout',
    },
  }).as(CMS_LOGOUT_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/cart',
    },
  }).as(CMS_CART_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/checkout/shipping-address',
    },
  }).as(CMS_SHIPPING_ADDRESS_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/checkout/delivery-mode',
    },
  }).as(CMS_DELIVERY_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/checkout/payment-details',
    },
  }).as(CMS_PAYMENT_PAGE.substr(1));

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${base_sites}/cms/pages`,
    query: {
      pageType: 'ContentPage',
      pageLabelOrId: '/checkout/review-order',
    },
  }).as(CMS_REVIEW_PAGE.substr(1));
}

// before(() => {
//   registerInterceptors();
// });

beforeEach(() => {
  registerInterceptors();
});

import { product } from '../sample-data/checkout-flow';

export const username = 'test-user-with-orders@sap.cx.com';
export const password = 'pw4all';
export const firstName = 'Test';
export const lastName = 'User';
export const titleCode = 'mr';

export function loginSuccessfully() {
  cy.login('test-user-with-orders@sap.cx.com', 'pw4all');
  cy.visit('/');
  cy.get('.cx-login-greet').should('contain', 'Test User');
}

export function addShippingAddress() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/test-user-with-orders@sap.cx.com/addresses?lang=en&curr=USD`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token.access_token
      }`,
    },
    body: {
      defaultAddress: false,
      titleCode: 'mr',
      firstName: 'Cypress',
      lastName: 'Customer',
      line1: '999 de Maisonneuve',
      line2: '',
      town: 'California',
      region: { isocode: 'US-CA' },
      country: { isocode: 'US' },
      postalCode: '90015',
      phone: '917-000-0000',
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}

export function goToProductPageFromCategory() {
  // click big banner
  cy.get('.Section1 cx-banner cx-generic-link')
    .first()
    .find('cx-media')
    .click();
  // click small banner number 6 (would be good if label or alt text would be available)
  cy.get('.Section2 cx-banner:nth-of-type(6) a cx-media').click();
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', product.name);
  });
}

export function addProductToCart() {
  cy.get('cx-item-counter').findByText('+').click();
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.findByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Cart');
}

export function addPaymentMethod() {
  cy.get('.cx-total')
    .first()
    .then(($cart) => {
      const cartid = $cart.text().match(/[0-9]+/)[0];
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/test-user-with-orders@sap.cx.com/carts/${cartid}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token
              .access_token
          }`,
        },
        body: {
          accountHolderName: 'test user',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '01',
          expiryYear: '2125',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'test',
            lastName: 'user',
            titleCode: 'mr',
            line1: '999 de Maisonneuve',
            line2: '',
            town: 'Montreal',
            postalCode: 'H4B3L4',
            country: { isocode: 'US' },
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
}

export function selectShippingAddress() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageLabelOrId: '/checkout/shipping-address',
    },
  }).as('getShippingPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait('@getShippingPage');

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', 'Default Shipping Address');
  cy.get('.card-header').should('contain', 'Selected');

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageLabelOrId: '/checkout/delivery-mode',
    },
  }).as('getDeliveryPage');
  cy.intercept({
    method: 'PUT',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/deliverymode`,
  }).as('putDeliveryMode');
  cy.get('button.btn-primary').click();
  cy.wait('@getDeliveryPage').its('response.statusCode').should('eq', 200);
  cy.wait('@putDeliveryMode').its('response.statusCode').should('eq', 200);
}

export function selectDeliveryMethod() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages`,
    query: {
      pageLabelOrId: '/checkout/payment-details',
    },
  }).as('getPaymentPage');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
  cy.get('cx-delivery-mode input').first().should('be.checked');
  cy.get('button.btn-primary').click();
  cy.wait('@getPaymentPage').its('response.statusCode').should('eq', 200);
}

export function selectPaymentMethod() {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-total')
    .find('.cx-summary-amount')
    .should('not.be.empty');
  cy.get('.cx-card-title').should('contain', '✓ DEFAULT');
  cy.get('.card-header').should('contain', 'Selected');
  cy.get('button.btn-primary').click();
}

export function verifyAndPlaceOrder() {
  cy.get('.cx-review-title').should('contain', 'Review');
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Ship To')
    .find('.cx-card-container')
    .should('not.be.empty');
  cy.get('.cx-review-summary-card')
    .contains('cx-card', 'Shipping Method')
    .find('.cx-card-label-bold')
    .should('contain', 'Standard Delivery');
  cy.get('cx-order-summary .cx-summary-total .cx-summary-amount').should(
    'not.be.empty'
  );

  cy.get('.form-check-input').check();
  cy.get('button.btn-primary').click();
}

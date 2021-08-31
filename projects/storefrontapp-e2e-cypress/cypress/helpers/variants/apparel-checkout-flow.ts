import { products } from '../../sample-data/apparel-checkout-flow';
import { addCheapProductToCart } from '../checkout-flow';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'GBP';

export function configureProductWithVariants() {
  cy.cxConfig({
    context: {
      baseSite: [APPAREL_BASESITE],
      currency: ['GBP'],
    },
    checkout: { guest: true },
  });
}

export function addVariantOfSameProductToCart() {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/${products[1].code}/reviews`,
  }).as('getProductPageReviews');
  cy.get('.variant-selector ul.variant-list li:nth-child(2)').first().click();
  cy.wait('@getProductPageReviews')
    .its('response.statusCode')
    .should('eq', 200);

  addCheapProductToCart(products[1]);
}

export function visitProductWithoutVariantPage() {
  configureProductWithVariants();
  cy.visit(`${APPAREL_BASESITE}/en/GBP/product/300611156`);
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', products[2].code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', products[2].name);
  });
}

export function addMutipleProductWithoutVariantToCart() {
  cy.get('cx-item-counter').findByText('+').click();
  cy.get('cx-add-to-cart')
    .findByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', products[2].name);
  });
}

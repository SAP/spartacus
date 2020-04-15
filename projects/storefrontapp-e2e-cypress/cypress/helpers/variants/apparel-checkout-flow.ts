import { products } from '../../sample-data/apparel-checkout-flow';
import { addCheapProductToCart } from '../checkout-flow';

export const APPAREL_BASESITE = 'apparel-uk-spa';
export const APPAREL_CURRENCY = 'GBP';
export const APPAREL_DEFAULT_DELIVERY_MODE = 'deliveryMode-standard-gross';

export function configureProductWithVariants() {
  cy.cxConfig({
    context: {
      baseSite: ['apparel-uk-spa'],
      currency: ['GBP'],
    },
    checkout: { guest: true },
  });
}

export function addVariantOfSameProductToCart() {
  cy.server();
  cy.route(
    'GET',
    `/rest/v2/apparel-uk-spa/products/${products[1].code}/reviews*`
  ).as('getProductPage');
  cy.get('.variant-selector ul.variant-list li:nth-child(2)').first().click();
  cy.wait('@getProductPage').its('status').should('eq', 200);

  addCheapProductToCart(products[1]);
}

export function visitProductWithoutVariantPage() {
  configureProductWithVariants();
  cy.visit('apparel-uk-spa/en/GBP/product/300611156');
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', products[2].code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', products[2].name);
  });
}

export function addMutipleProductWithoutVariantToCart() {
  cy.get('cx-item-counter').getByText('+').click();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', products[2].name);
  });
}

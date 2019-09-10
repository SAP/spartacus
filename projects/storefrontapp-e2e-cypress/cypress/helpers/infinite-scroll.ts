import { createProductQuery } from './product-search';

export function scrollConfig(
  active: boolean,
  productLimit: number,
  showMoreButton: boolean
) {
  cy.cxConfig({
    view: {
      infiniteScroll: {
        active,
        productLimit,
        showMoreButton,
      },
    },
  });
}

export function verifyProductListLoaded() {
  cy.server();
  createProductQuery('product');
  cy.visit('/Open-Catalogue/Cameras/Digital-Cameras/c/575');
  cy.wait('@product');
}

export function scrollToFooter() {
  cy.get('cx-footer-navigation').scrollIntoView({
    duration: 1000,
    easing: 'linear',
  });
}

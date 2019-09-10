import { createProductQuery } from './product-search';

var defaultProductLimit = 10;

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

// tslint:disable-next-line: no-shadowed-variable
export function scrollToFooter(productLimit?: number) {
  if (productLimit) {
    defaultProductLimit = productLimit;
  }

  cy.get('cx-breadcrumb h1').should($breadcrumb => {
    const breadcrumbQuantityNumber = Number($breadcrumb.text().split(' ')[0]);
    const numberOfIteration = Math.ceil(
      breadcrumbQuantityNumber / productLimit
    );
    console.log('text', numberOfIteration);

    for (let i = 0; i <= numberOfIteration; i++) {
      cy.get('cx-footer-navigation').scrollIntoView({
        duration: 1000,
        easing: 'linear',
      });
    }
  });

  // const numberOfIteration = Math.ceil();
}

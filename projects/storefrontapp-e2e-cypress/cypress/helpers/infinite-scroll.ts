import { createProductQuery } from './product-search';

const scrollDuration = 1000;
let defaultProductLimit = 10;
let numberOfIteration = 0;
let numberOfProducts = 10;

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
  cy.visit('/Open-Catalogue/Components/Power-Supplies/c/816');
  cy.wait('@product');
}

export function assertNumberOfProducts() {
  cy.get('cx-product-list-item').should('have.length', numberOfProducts);
}

export function backToTopIsVisisble() {
  cy.get('.cx-single-btn-container').should('be.visible');
}

export function backtoTopIsNotVisible() {
  cy.get('.cx-single-btn-container').should('not.be.visible');
}

export function scrollToFooter(productLimit?: number) {
  if (productLimit) {
    defaultProductLimit = productLimit;
  }
  // cy.get('cx-breadcrumb h1').should($breadcrumb => {
  //   const breadcrumbQuantityNumber = Number($breadcrumb.text().split(' ')[0]);
  //   const numberOfIteration = Math.ceil(
  //     breadcrumbQuantityNumber / defaultProductLimit
  //   );
  //   console.log('breadnum', breadcrumbQuantityNumber);
  //   console.log('typeof', typeof breadcrumbQuantityNumber);
  //   console.log('productlimit', defaultProductLimit);
  //   console.log('typeof', typeof defaultProductLimit);
  //   console.log('numberOfIteration', numberOfIteration);
  //   // for (let i = 0; i < numberOfIteration; i++) {
  //   // cy.get('cx-footer-navigation').scrollIntoView({
  //   //   duration: 1000,
  //   //   easing: 'linear',
  //   // });
  //   // }
  // });
  // for (let i = 0; i < 2; i++) {
  //   cy.get('cx-footer-navigation')
  //     .scrollIntoView({
  //       duration: 1000,
  //       easing: 'linear',
  //     })
  //     .should('be.visible');
  // }
  /* better one */
  // cy.get('cx-breadcrumb h1').then($breadcrumb => {
  //   const breadcrumbQuantityNumber = Number($breadcrumb.text().split(' ')[0]);
  //   numberOfIteration = Math.floor(
  //     breadcrumbQuantityNumber / defaultProductLimit
  //   );
  //   for (let i = 0; i < numberOfIteration; i++) {
  //     console.log('numof', numberOfIteration);
  //     cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration })
  //       .wait('@product')
  //       .wait(scrollDuration);
  //   }
  // });

  /* working solution */
  cy.get('cx-breadcrumb h1').then($breadcrumb => {
    const breadcrumbQuantityNumber = Number($breadcrumb.text().split(' ')[0]);
    numberOfIteration = Math.floor(
      breadcrumbQuantityNumber / defaultProductLimit
    );
    for (let i = 1; i < numberOfIteration; i++) {
      console.log('numof', numberOfIteration);
      cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration })
        .wait('@product')
        .then(() => {
          numberOfProducts += 10;
          cy.get('cx-product-list-item').should(
            'have.length',
            numberOfProducts
          );
        });
    }
  });

  // cy.get('cx-product-list-item').then($list => {
  //   const element = $list[defaultProductLimit - 1];

  //   console.log(element);
  // });

  // for (let i = 1; i < 3; i++) {
  //   cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration })
  //     .wait('@product')
  //     .then(() => {
  //       numberOfProducts += 10;
  //       cy.get('cx-product-list-item').should('have.length', numberOfProducts);
  //     });
  // }

  // cy.get('.cx-page').should($el => {
  //   console.log('$el', $el[0].clientHeight);
  // });

  // cy.get('.cx-single-btn-container').isInViewport();
  // cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration }).then(
  //   () => {
  //     numberOfProducts += numberOfProducts;

  //     cy.get('cx-product-list-item').should('have.length', numberOfProducts);
  //   }
  // );

  // const numberOfIteration = Math.ceil();
}

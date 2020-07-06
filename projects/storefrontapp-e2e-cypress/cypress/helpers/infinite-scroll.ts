import { PRODUCT_LISTING } from './data-configuration';
import {
  clickFacet,
  createAllProductQuery,
  QUERY_ALIAS,
} from './product-search';

const scrollDuration = 100;
const defaultNumberOfProducts = 10;
let defaultProductLimit = 10;

const productScrollButtons = 'cx-product-scroll .btn-action';

const doubleButton = 'double';
const singleButton = 'single';

export function configScroll(
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

export function assertDefaultNumberOfProducts(view) {
  cy.get(`cx-product-${view}-item`).should(
    'have.length',
    defaultNumberOfProducts
  );
}

export function isPaginationNotVisible() {
  cy.get('cx-pagination a').should('not.exist');
}

export function isPaginationVisible() {
  cy.get('cx-pagination a').should('exist');
}

export function backToTopIsVisible(isShowMoreButton?: boolean) {
  if (isShowMoreButton) {
    cy.get(`.cx-${doubleButton}-btn-container`).should('be.visible');
  } else {
    cy.get(`.cx-${singleButton}-btn-container`).should('be.visible');
  }
}

export function verifyNumberOfProducts(numberOfProducts) {
  cy.get('cx-product-list-item').should('have.length', numberOfProducts);
}

export function backtoTopIsNotVisible() {
  cy.get(`.cx-${singleButton}-btn-container`).should('not.be.visible');
}

export function scrollToFooter(
  results: number,
  isShowMoreButton?: boolean,
  productLimit?: number
) {
  if (productLimit) {
    defaultProductLimit = productLimit;
  }

  const iterations = Math.floor(results / defaultProductLimit);

  let numberOfProducts = defaultNumberOfProducts;

  for (let i = 1; i < iterations; i++) {
    if (isShowMoreButton) {
      cy.get('div')
        .contains('SHOW MORE')
        .click({ force: true })
        .wait(`@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`)
        .then(() => {
          numberOfProducts += defaultNumberOfProducts;
          verifyNumberOfProducts(numberOfProducts);

          cy.get(productScrollButtons).should('exist');
        });
    } else {
      cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration })
        .wait(`@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`)
        .then(() => {
          numberOfProducts += defaultNumberOfProducts;
          verifyNumberOfProducts(numberOfProducts);

          if (!productLimit) {
            cy.get(productScrollButtons).should('not.contain', ' SHOW MORE ');
          } else {
            cy.get(productScrollButtons).should('exist');
          }
        });
    }
  }
}

export function verifySortingResetsList() {
  cy.get('cx-sorting .ng-select:first').ngSelect(
    PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
  );

  cy.wait(`@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`)
    .its('status')
    .should('eq', 200);

  assertDefaultNumberOfProducts('list');
}

export function verifyFilterResetsList() {
  clickFacet('Brand', '');

  cy.wait(`@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`)
    .its('status')
    .should('eq', 200);

  assertDefaultNumberOfProducts('list');
}

export function verifyGridResetsList() {
  cy.get('cx-product-view > button.cx-product-grid:first').click({
    force: true,
  });

  cy.wait(`@${QUERY_ALIAS.INFINITE_SCROLL_PRODUCT_LOADED}`)
    .its('status')
    .should('eq', 200);

  assertDefaultNumberOfProducts('grid');
}

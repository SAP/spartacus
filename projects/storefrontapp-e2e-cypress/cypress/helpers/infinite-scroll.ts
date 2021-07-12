import { PRODUCT_LISTING } from './data-configuration';
import { clickFacet } from './product-search';

const scrollDuration = 5000;
const defaultNumberOfProducts = 12;
let defaultProductLimit = 12;

const defaultQueryName = `query_relevance`;
const defaultQueryAlias = `@${defaultQueryName}`;

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
  totalResults: number,
  isShowMoreButton?: boolean,
  productLimit?: number
) {
  if (productLimit) {
    defaultProductLimit = productLimit;
  }

  const iterations = Math.floor(totalResults / defaultProductLimit);

  let numberOfProducts = defaultNumberOfProducts;

  for (let i = 1; i < iterations; i++) {
    if (isShowMoreButton) {
      cy.get('div')
        .contains('SHOW MORE')
        .click({ force: true })
        .wait(defaultQueryAlias)
        .then(() => {
          numberOfProducts += defaultNumberOfProducts;
          verifyNumberOfProducts(numberOfProducts);

          cy.get(productScrollButtons).should('exist');
        });
    } else {
      cy.scrollTo('bottom', { duration: scrollDuration });
      cy.scrollTo('bottom')
        .wait(defaultQueryAlias)
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

  cy.wait('@sortQuery').then(() => {
    assertDefaultNumberOfProducts('list');
  });
}

export function verifyFilterResetsList() {
  clickFacet('Brand');

  cy.wait('@gridQuery').then(() => {
    assertDefaultNumberOfProducts('list');
  });
}

export function verifyGridResetsList() {
  cy.get('cx-product-view > button.cx-product-grid:first').click({
    force: true,
  });

  cy.wait('@gridQuery').then(() => {
    assertDefaultNumberOfProducts('grid');
  });
}

import { PRODUCT_LISTING } from './data-configuration';
import { createProductQuery } from './product-search';
import { clickFacet } from './product-search-product-type-flow';

const scrollDuration = 1000;
const defaultNumberOfProducts = 10;
let defaultProductLimit = 10;
let numberOfIteration = 0;

const productLoadedQuery = 'productLoaded';
const productScrollButtons = 'cx-product-scroll .btn-action';

const doubleButton = 'double';
const singleButton = 'single';

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
  createProductQuery(productLoadedQuery);
  cy.visit('/Open-Catalogue/Components/Power-Supplies/c/816');
  cy.wait(`@${productLoadedQuery}`);
}

export function assertDefaultNumberOfProducts(view) {
  cy.get(`cx-product-${view}-item`).should(
    'have.length',
    defaultNumberOfProducts
  );
}

export function isPaginationNotVisible() {
  cy.get('cx-pagination .pagination').should('not.exist');
}

export function isPaginationVisible() {
  cy.get('cx-pagination .pagination').should('exist');
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
  isShowMoreButton?: boolean,
  productLimit?: number
) {
  if (productLimit) {
    defaultProductLimit = productLimit;
  }

  cy.get('cx-breadcrumb h1').then($breadcrumb => {
    const breadcrumbQuantityNumber = Number($breadcrumb.text().split(' ')[0]);

    numberOfIteration = Math.floor(
      breadcrumbQuantityNumber / defaultProductLimit
    );

    let numberOfProducts = defaultNumberOfProducts;

    for (let i = 1; i < numberOfIteration; i++) {
      if (isShowMoreButton) {
        cy.get('div')
          .contains('SHOW MORE')
          .click({ force: true })
          .wait(`@${productLoadedQuery}`)
          .then(() => {
            numberOfProducts += defaultNumberOfProducts;
            verifyNumberOfProducts(numberOfProducts);

            cy.get(productScrollButtons).should('exist');
          });
      } else {
        cy.scrollTo('bottom', { easing: 'linear', duration: scrollDuration })
          .wait(`@${productLoadedQuery}`)
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
  });
}

export function verifySortingResetsList() {
  cy.get('cx-sorting .ng-select:first').ngSelect(
    PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
  );

  cy.wait(`@${productLoadedQuery}`);

  assertDefaultNumberOfProducts('list');
}

export function verifyFilterResetsList() {
  clickFacet('Brand');

  cy.wait(`@${productLoadedQuery}`);

  assertDefaultNumberOfProducts('list');
}

export function verifyGridResetsList() {
  cy.get('cx-product-view > div > div:first').click({ force: true });

  cy.wait(`@${productLoadedQuery}`);

  assertDefaultNumberOfProducts('grid');
}

export function infiniteScrollNoShowMoreTest() {
  it('should be active', () => {
    isPaginationNotVisible();

    backtoTopIsNotVisible();
    scrollToFooter();
    backToTopIsVisible();
  });

  it('should reset the list when sorting', () => {
    verifySortingResetsList();
  });

  it('should reset the list when filtering', () => {
    verifyFilterResetsList();
  });

  it('should reset the list when in grid view', () => {
    verifyGridResetsList();
  });
}

export function infiniteScrollWithShowMoreAtTheBeginningTest() {
  it('should be active', () => {
    isPaginationNotVisible();

    scrollToFooter(true);
    backToTopIsVisible();
  });
}

export function infiniteScrollWithShowMoreAtALimit() {
  it('should be active', () => {
    isPaginationNotVisible();

    backtoTopIsNotVisible();
    scrollToFooter(false, 15);
    backToTopIsVisible(true);
  });
}

export function infiniteScrollNotActivatedTest() {
  it('should not be active', () => {
    isPaginationVisible();
  });
}

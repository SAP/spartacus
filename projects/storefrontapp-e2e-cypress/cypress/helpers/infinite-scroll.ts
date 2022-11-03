/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRODUCT_LISTING } from './data-configuration';
import { waitForCategoryPage } from './navigation';
import { clickFacet, searchUrlPrefix } from './product-search';

const scrollDuration = 5000;
const defaultNumberOfProducts = 12;
let defaultProductLimit = 12;

const productScrollButtons = 'cx-product-scroll .btn-action';

const doubleButton = 'double';
const singleButton = 'single';

export const powerSuppliesCategoryCode = '816';
export const testUrl = `/Open-Catalogue/Components/Power-Supplies/c/${powerSuppliesCategoryCode}`;
export const defaultQuery = `query_relevance`;
export const defaultQueryAlias = `@${defaultQuery}`;

export function visitPowerSupplyListingPage() {
  const categoryPage = waitForCategoryPage(
    powerSuppliesCategoryCode,
    'getCategory'
  );
  cy.visit(testUrl);
  cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);
}

export function verifyInfiniteScrollConfigSetProperly(
  isActive: boolean,
  hasProductLimit: number,
  isShowMoreButton: boolean
) {
  cy.getCookie('cxConfigE2E')
    .should('exist')
    .then((data) => {
      const {
        view: {
          infiniteScroll: { active, productLimit, showMoreButton },
        },
      } = JSON.parse(decodeURIComponent(data.value));
      expect(active).to.equal(isActive);
      expect(productLimit).to.equal(hasProductLimit);
      expect(showMoreButton).to.equal(isShowMoreButton);
    });
}

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
      cy.scrollTo('bottom');
      cy.get('div.btn-action')
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

export function testInfiniteScrollAvoidDisplayShowMoreButton() {
  it("should enable Infinite scroll and NOT display 'Show more' button", () => {
    configScroll(true, 0, false);

    visitPowerSupplyListingPage();

    cy.intercept({
      method: 'GET',
      pathname: searchUrlPrefix,
      query: {
        fields: '*',
        query: ':topRated:allCategories:816:brand:brand_5',
      },
    }).as('gridQuery');

    cy.intercept({
      method: 'GET',
      pathname: searchUrlPrefix,
      query: {
        query: ':relevance:allCategories:816',
        sort: 'topRated',
        fields: '*',
      },
    }).as('sortQuery');

    cy.wait(defaultQueryAlias).its('response.statusCode').should('eq', 200);

    verifyInfiniteScrollConfigSetProperly(true, 0, false);

    cy.get(defaultQueryAlias).then((waitXHR) => {
      const totalResults = waitXHR.response.body.pagination.totalResults;
      isPaginationNotVisible();

      backtoTopIsNotVisible();
      scrollToFooter(totalResults);
      backToTopIsVisible();

      verifySortingResetsList();

      verifyFilterResetsList();

      verifyGridResetsList();
    });
  });
}

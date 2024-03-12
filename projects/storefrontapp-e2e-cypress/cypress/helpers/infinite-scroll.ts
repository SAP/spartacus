/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from './checkout-flow';
import { PRODUCT_LISTING } from './data-configuration';
import { waitForCategoryPage } from './navigation';
import { clickFacet } from './product-search';
import { searchUrlPrefix } from './product-search';

const scrollDuration = 5000;
const defaultNumberOfProducts = 12;
let defaultProductLimit = 12;

const productScrollButtons = 'cx-product-scroll .btn-secondary';

const doubleButton = 'double';
const singleButton = 'single';

export const powerSuppliesCategoryCode = '816';
export const testUrl = `/Open-Catalogue/Components/Power-Supplies/c/${powerSuppliesCategoryCode}`;
export const defaultQuery = `query_relevance`;
export const defaultQueryAlias = `@${defaultQuery}`;

export const homepage = '/';
export const SONY_CAMERA_URL_PATH = 'product/358639/dsc-n1';
export const PRODUCT_DETAILS_HEADER = `[role="region"] > :nth-child(1)`;
export const BACK_TO_TOP_BUTTON = `.cx-scroll-to-top-btn`;

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
      cy.get('div.cx-single-btn-container')
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

export function acceptPrivaryTerm() {
  cy.get('.anonymous-consent-banner .btn-primary', { timeout: 10000 }).then(
    () => {
      cy.get('.anonymous-consent-banner .btn-primary').click();
    }
  );
}

export function addToCartFromList(numberOfItems) {
  for (let i = 1; i <= numberOfItems; i++) {
    cy.get(
      `:nth-child(${i}) > :nth-child(1) > .col-md-8 > .row > .col-md-5 > cx-add-to-cart > .ng-untouched > .btn`
    ).click({ force: true });
    cy.get('cx-added-to-cart-dialog .cx-dialog-title').should(
      'contain',
      'Item(s) added to your cart'
    );
    cy.get('.cx-dialog-header .close').click();
  }
  cy.get('cx-mini-cart .count').should('contain', numberOfItems);
}

export function clickCartIcon() {
  cy.get('cx-mini-cart > a').click();
}

export function scrollToBottomOfPageAndClickBackToTopButton() {
  cy.get(`.cx-scroll-to-top-btn`).should('not.be.visible');
  cy.scrollTo('bottom');
  cy.get(`.cx-scroll-to-top-btn`).should('be.visible');
  cy.get(`.cx-scroll-to-top-btn`).click();

  cy.window().its('scrollY').should('equal', 0);
}

export function verifyBackToTopButtonIsNotVisible() {
  cy.get(`.cx-scroll-to-top-btn`).should('not.be.visible');
}

export function verifyBackToTopButtonIsVisible() {
  cy.get(`.cx-scroll-to-top-btn`).should('be.visible');
}

export function scrollToTopOfPage() {
  cy.scrollTo('top');
}

export function scrollToBottomOfPage() {
  cy.scrollTo('bottom');
}

export function scrollToSpecificSectionOfPage(location) {
  cy.scrollTo(location);
}

export function clickSpecficComponentOfPage(css_selector) {
  cy.get(css_selector).click();
}

export function verifyBackToTopButtonTakesPageToTop() {
  cy.window().its('scrollY').should('equal', 0);
}

export function goToURLAndWaitTillItLoads(pageName) {
  cy.intercept(pageName).as(`get${pageName}Page`);
  cy.visit(pageName);
  cy.wait(`get${pageName}Page`).its('response.statusCode').should('eq', 200);
}

export function testInfiniteScrollAvoidDisplayShowMoreButton() {
  it("should enable Infinite scroll and NOT display 'Show more' button", () => {
    configScroll(true, 0, false);
    cy.visit(testUrl);

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

    cy.wait(defaultQueryAlias).then((waitXHR) => {
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

export function visitHomePage() {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.visit(homepage);
  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
}

export function interceptSpecificPage(pagename: string) {
  cy.intercept(pagename).as('getProductListPage');
  cy.visit(pagename);
  cy.wait(`@getProductListPage`).its('response.statusCode').should('eq', 200);
}

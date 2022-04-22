import { testProductListUrl, verifyTabbingOrder } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.ProductListPageTemplate';

export function toggleProductView() {
  cy.get('cx-product-list cx-product-view').first().click();
}

export function productListTabbingOrderDesktop(config: TabElement[]) {
  cy.visit(testProductListUrl);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Brands');

  verifyTabbingOrder(containerSelector, config);
}

export function productListTabbingOrderMobile(config: TabElement[]) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');

  cy.visit(testProductListUrl);
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.wait('@getComponents');

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Brands');

  verifyTabbingOrder(containerSelector, config);
}

const containerSelectorMobileFilters = 'cx-facet-list';

export function productListTabbingOrderMobileFilters(config: TabElement[]) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');

  cy.visit(testProductListUrl);
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.wait('@getComponents');
  cy.get('cx-product-facet-navigation button.dialog-trigger').first().click();

  cy.get('cx-facet button[tabindex=-1]');

  verifyTabbingOrder(containerSelectorMobileFilters, config);
}

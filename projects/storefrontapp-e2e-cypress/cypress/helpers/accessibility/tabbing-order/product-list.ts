import { testProductListUrl, verifyTabbingOrder } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';
import { TabElement } from '../tabbing-order.model';

// Temporarily checking only 'the right side' without product filters
// TODO: Refactor filter, so they don't have tabindex attribute when not active
// const containerSelector = '.ProductListPageTemplate';

const containerSelector = '.ProductListSlot';

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
  cy.visit(testProductListUrl);
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Brands');

  verifyTabbingOrder(containerSelector, config);
}

const containerSelectorMobileFilters = 'ngb-modal-window';

export function productListTabbingOrderMobileFilters(config: TabElement[]) {
  cy.visit(testProductListUrl);
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.get(
    'cx-product-facet-navigation div.cx-facet-mobile button.cx-facet-mobile-btn'
  )
    .first()
    .click();

  verifyTabbingOrder(containerSelectorMobileFilters, config);
}

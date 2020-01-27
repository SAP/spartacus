import { testProductListUrl, verifyTabbingOrder } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';
import { TabElement } from '../tabbing-order.model';

const containerSelector = '.ProductListPageTemplate';

export function productListTabbingOrderDesktop(config: TabElement[]) {
  cy.visit(testProductListUrl);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Brands');

  verifyTabbingOrder(containerSelector, config);
}

export function toggleProductView() {
  cy.get('cx-product-list cx-product-view')
    .first()
    .click();
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

import {
  checkAllElements,
  TabElement,
  testProductListUrl,
} from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';

export function productListTabbingOrderDesktop(config: TabElement[]) {
  cy.visit(testProductListUrl);

  cy.get('cx-breadcrumb').should('contain', 'Home');
  cy.get('cx-breadcrumb').should('contain', 'Brands');

  cy.get('.cx-facet-header-link')
    .contains('Stores')
    .first()
    .focus();

  checkAllElements(config);
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

  cy.get(
    'cx-product-facet-navigation div.cx-facet-mobile button.cx-facet-mobile-btn'
  )
    .first()
    .focus();

  checkAllElements(config);
}

export function productListTabbingOrderMobileFilters(config: TabElement[]) {
  cy.visit(testProductListUrl);
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.get(
    'cx-product-facet-navigation div.cx-facet-mobile button.cx-facet-mobile-btn'
  )
    .first()
    .click();
  cy.get('ngb-modal-window button')
    .first()
    .focus();

  checkAllElements(config);
}

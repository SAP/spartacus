import { user } from '../../../../sample-data/checkout-flow';
import { fillShippingAddress } from '../../../checkout-forms';
import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutShippingAddressNewTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/shipping-address');

  const { firstName, lastName, phone, address } = user;
  fillShippingAddress({ firstName, lastName, phone, address }, false);

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/delivery-mode');
}

export function checkoutShippingAddressExistingTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/checkout/shipping-address');

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-actions .cx-card-link').click({ force: true });
  });

  verifyTabbingOrder(containerSelector, config);
}

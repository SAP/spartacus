import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { user } from '../../../../sample-data/checkout-flow';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.MultiStepCheckoutSummaryPageTemplate';

export function checkoutDeliveryModeTabbingOrder(config: TabElement[]) {
  cy.window().then(win => {
    const { auth } = JSON.parse(
      win.localStorage.getItem('spartacus-local-data')
    );
    cy.requireProductAddedToCart(auth).then(() => {
      cy.requireShippingAddressAdded(user.address, auth);
    });
  });

  cy.visit('/checkout/delivery-mode');

  cy.get('cx-delivery-mode input');

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/payment-details');
}

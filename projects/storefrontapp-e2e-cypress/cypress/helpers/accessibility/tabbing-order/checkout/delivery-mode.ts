import { checkAllElements, checkoutNextStep } from '../../tabbing-order';
import { user } from '../../../../sample-data/checkout-flow';
import { TabElement } from '../../tabbing-order.model';

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

  cy.get('input[type=radio][formcontrolname=deliveryModeId]')
    .first()
    .focus()
    .click();

  checkAllElements(config);
  checkoutNextStep('/checkout/payment-details');
}

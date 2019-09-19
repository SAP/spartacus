import { TabElement, checkAllElements } from '../../tabbing-order';
import { waitForPage } from '../../../checkout-flow';
import { user } from '../../../../sample-data/checkout-flow';

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

  const nextStep = waitForPage('/checkout/payment-details', 'getNextStep');
  cy.getAllByText('Continue')
    .first()
    .click();
  cy.wait(`@${nextStep}`);
}

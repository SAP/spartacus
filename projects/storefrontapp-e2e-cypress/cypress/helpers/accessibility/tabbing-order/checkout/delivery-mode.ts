import { TabElement, checkAllElements } from '../../tabbing-order';
import { waitForPage } from '../../../checkout-flow';

export function checkoutDeliveryModeTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/delivery-mode');

  cy.get('input[type=radio][formcontrolname=deliveryModeId]')
    .first()
    .focus()
    .click();

  checkAllElements(config);

  const nextStep = waitForPage('/checkout/payment-details', 'getNextStep');
  cy.getByText('Continue').click();
  cy.wait(`@${nextStep}`);
}

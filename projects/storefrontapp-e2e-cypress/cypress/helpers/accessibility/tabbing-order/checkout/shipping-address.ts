import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../../tabbing-order';
import { fillShippingAddress } from '../../../checkout-forms';
import { user } from '../../../../sample-data/checkout-flow';
import { waitForPage } from '../../../checkout-flow';

export function checkoutShippingAddressNewTabbingOrder(config: TabElement[]) {
  cy.visit('/checkout/shipping-address');

  const { firstName, lastName, phone, address } = user;
  fillShippingAddress({ firstName, lastName, phone, address }, false);

  getFormFieldByValue(config[0].value).within(() => {
    cy.get('input')
      .first()
      .focus();
  });

  checkAllElements(config);

  const nextStep = waitForPage('/checkout/delivery-mode', 'getNextStep');
  cy.getByText('Continue').click();
  cy.wait(`@${nextStep}`);
}

export function checkoutShippingAddressExistingTabbingOrder(
  config: TabElement[]
) {
  cy.getByText('Add New Address')
    .first()
    .focus();

  checkAllElements(config);
}

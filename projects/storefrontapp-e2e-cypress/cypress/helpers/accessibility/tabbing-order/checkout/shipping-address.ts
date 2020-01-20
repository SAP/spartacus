import {
  getFormFieldByValue,
  checkAllElements,
  checkoutNextStep,
} from '../../tabbing-order';
import { fillShippingAddress } from '../../../checkout-forms';
import { user } from '../../../../sample-data/checkout-flow';
import { TabElement } from '../../tabbing-order.model';

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
  checkoutNextStep('/checkout/delivery-mode');
}

export function checkoutShippingAddressExistingTabbingOrder(
  config: TabElement[]
) {
  cy.getAllByText('Add New Address')
    .first()
    .focus();

  checkAllElements(config);
}

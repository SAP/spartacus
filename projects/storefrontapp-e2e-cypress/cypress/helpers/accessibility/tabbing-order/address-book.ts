import {
  checkAllElements,
  TabElement,
  getFormFieldByValue,
} from '../tabbing-order';

export function addressBookAddAddressTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/address-book');
  // this.ngSelectInput.filterInput.nativeElement.focus();
  cy.get('cx-address-book ng-select').ngSelect('Mr.');
  // .first()
  // .focus();
  // getFormFieldByValue(config[0].value); //.focus(); // focus the first element

  checkAllElements(config);
}

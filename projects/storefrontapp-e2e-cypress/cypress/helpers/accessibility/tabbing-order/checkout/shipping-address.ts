import {
  getFormFieldByValue,
  checkAllElements,
  TabElement,
} from '../../tabbing-order';

export function shippingAddressTabbingOrder(config: TabElement[]) {
  const country = 'Canada'; // country with regions field available
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/countries/CA/regions*`
  ).as('regions');

  // fill out country field, so region field is visible
  cy.get('.country-select[formcontrolname="isocode"]').ngSelect(country);

  cy.wait('@regions');

  getFormFieldByValue(config[0].value).within(() => {
    cy.get('input')
      .first()
      .focus();
  });

  checkAllElements(config);
}

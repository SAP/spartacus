/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Adds the costcenter information and the delivery address to the current cart of the user.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireCostCenterAddressSelected(auth, cartId);
        ```
       */
      requireCostCenterAddressSelected: (
        auth: {},
        cartId?: string
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireCostCenterAddressSelected', (auth, cartId) => {
  const cartCode = cartId || 'current';

  function getCostCenters() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/costcenters`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  function addCostCenter(costCenterCode: string) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts/${cartCode}/costcenter?costCenterId=${costCenterCode}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  function addDeliveryAddress(addressId: string) {
    return cy.request({
      method: 'PUT',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/orgUsers/current/carts/${cartCode}/addresses/delivery?addressId=${addressId}`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.access_token}`,
      },
    });
  }

  getCostCenters().then((resp) => {
    const costCenter = resp.body.costCenters[0];
    const address = costCenter.unit.addresses[0];

    addCostCenter(costCenter.code);
    addDeliveryAddress(address.id);
  });
});

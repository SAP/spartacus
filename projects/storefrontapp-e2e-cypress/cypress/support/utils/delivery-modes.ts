/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function getDefaultDeliveryModeCode(
  accessToken: string,
  cartId?: string
) {
  const cartQueryValue = cartId || 'current';
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.expose('API_URL')}${Cypress.expose('OCC_PREFIX')}/${Cypress.expose(
        'BASE_SITE'
      )}/users/current/carts/${cartQueryValue}/deliverymodes`,
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.body.deliveryModes[0].code;
    });
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const cartUrlPrefix = `${Cypress.env('API_URL')}/${Cypress.env(
  'OCC_PREFIX'
)}/${Cypress.env('BASE_SITE')}/users/current/carts`;

export function createCart(accessToken: string) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts`,
    body: {
      fields: 'DEFAULT',
    },
    form: true,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
}

export function addToCart(
  cartCode: string,
  productCode: string,
  quantity: string,
  accessToken: string
) {
  const addToCartUrl = `${Cypress.env('API_URL')}/${Cypress.env(
    'OCC_PREFIX'
  )}/${Cypress.env('BASE_SITE')}/users/current/carts/${cartCode}/entries`;
  return cy.request({
    method: 'POST',
    url: addToCartUrl,
    body: {
      product: {
        code: productCode,
      },
      quantity: quantity,
    },
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
}

/**
 * @param accessToken access token
 * @returns promise of inactive card id
 */
export function createInactiveCart(accessToken: string): Promise<string> {
  let inactiveCartId = null;
  return new Promise((resolve, reject) => {
    createCart(accessToken).then((response) => {
      if (response.status === 201) {
        inactiveCartId = response.body.code;
        createCart(accessToken).then((response) => {
          if (response.status === 201) {
            resolve(inactiveCartId);
          } else {
            reject(response.status);
          }
        });
      } else {
        reject(response.status);
      }
    });
  });
}

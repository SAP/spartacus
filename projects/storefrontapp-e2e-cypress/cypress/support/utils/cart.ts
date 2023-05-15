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
      qty: quantity,
    },
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
}

export function addProductToB2BCart(
  cartCode: string,
  productCode: string,
  quantity: string,
  accessToken: string
) {
  const addToCartUrl = `${Cypress.env('API_URL')}/${Cypress.env(
    'OCC_PREFIX'
  )}/${Cypress.env('BASE_SITE')}/orgUsers/current/carts/${cartCode}/entries/`;
  return cy.request({
    method: 'POST',
    url: addToCartUrl,
    body: {
      orderEntries: [
        {
          product: {
            code: productCode,
          },
          quantity: quantity,
        },
      ],
    },
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
}

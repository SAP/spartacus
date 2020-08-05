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
      code: productCode,
      qty: quantity,
    },
    form: true,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
}

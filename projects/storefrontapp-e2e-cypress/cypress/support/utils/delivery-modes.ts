export function getDefaultDeliveryModeCode(
  accessToken: string,
  cartId?: string
) {
  const cartQueryValue = cartId || 'current';
  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
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

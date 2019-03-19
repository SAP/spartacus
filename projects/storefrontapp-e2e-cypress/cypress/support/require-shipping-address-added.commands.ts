// import { generateMail } from '../helpers/user';
import { user } from '../sample-data/big-happy-path';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have placed the order. Returns order object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(); // default values
        cy.requirePlacedOrder(user, product, cart);
        ```
       */
      requireShippingAddressAdded: (
        address: {},
        auth: {}
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireShippingAddressAdded', (address, res) => {
  const apiUrl = Cypress.env('API_URL');
  // const email = res.email;
  address.firstName = user.firstName;
  address.lastName = user.lastName;
  address.town = address.city;
  address.postalCode = address.postal;
  address.titleCode = 'Mr';
  address.country = {
    isocode: 'US',
    name: 'United States'
  };
  address.defaultAddress = false;
  function addAddress() {
    console.log(address, user);
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/current/addresses/delivery`,
      body: address,
      form: false,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  // function setAddress(addressId: string) {
  //   console.log(addressId);
  //   return cy.request({
  //     method: 'PUT',
  //     url: `${apiUrl}/rest/v2/electronics/users/current/carts/current/addresses/delivery?addressId=${addressId}`,
  //     form: false,
  //     headers: {
  //       Authorization: `bearer ${res.userToken.token.access_token}`
  //     }
  //   });
  // }

  cy.server();
  addAddress().then(resp => {
    // console.log(resp);
    // setAddress(resp.body.id).then(() => cy.wrap({}));
    return cy.wrap(resp);
  });
});

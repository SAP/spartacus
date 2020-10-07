import { AccountData } from '../../support/require-logged-in.commands';
import {
  //addCheapProductToCart,
  visitHomePage,
  //waitForPage,
} from '../checkout-flow';

export function loginB2bUser() {
  const b2bUser: AccountData = {
    user: '',
    registrationData: {
      firstName: '',
      lastName: '',
      password: '12341234',
      titleCode: 'mr',
      email: 'william.hunter@rustic-hw.com',
    },
  };
  cy.requireLoggedIn(b2bUser);
  visitHomePage();
}

export function loginApprover() {
  const approver: AccountData = {
    user: '',
    registrationData: {
      firstName: '',
      lastName: '',
      password: '12341234',
      titleCode: 'mr',
      email: 'hanna.schmidt@rustic-hw.com',
    },
  };
  cy.requireLoggedIn(approver);
  visitHomePage();
}

export function placeOrder() {
  let stateAuth: any;

  return cy
    .window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus-local-data')))
    .then(({ auth }) => {
      stateAuth = auth;
      return cy.requireProductAddedToCart(stateAuth, {
        productCode: '3881018',
        qty: 100,
      });
    })
    .then(({ cartId }) => {
      setPaymentType(cartId);
      setCostCenter(cartId);
      setAddress(cartId);
      setDeliveryMode(cartId);
      return placeOrderForApproval(cartId);
    });
}

export function setPaymentType(cartCode: string) {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/${cartCode}/paymenttype?paymentType=ACCOUNT`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

export function setCostCenter(cartCode: string) {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/${cartCode}/costcenter?costCenterId=Custom_Retail`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

export function setAddress(cartCode: string) {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/current/carts/${cartCode}/addresses/delivery?addressId=8796093612055`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

export function setDeliveryMode(cartCode: string) {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/${cartCode}/deliverymode?deliveryModeId=standard-net`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
          .token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

export function placeOrderForApproval(cartCode: string) {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env(
        'BASE_SITE'
      )}/orgUsers/current/orders?cartId=${cartCode}&termsChecked=true`,
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem('spartacus-local-data')).auth
            .userToken.token.access_token
        }`,
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
    });
}

const delay = 5000;
// 3 min in milliseconds
const timerTimeout = 180000;

export function waitForOrderPending(
  orderCode?: string,
  contentCatalog: string = Cypress.env('BASE_SITE'),
  elapsedTime = 0
) {
  const { userId, access_token } = JSON.parse(
    localStorage.getItem('spartacus-local-data')
  ).auth.userToken.token;

  return cy
    .request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}${Cypress.env(
        'OCC_PREFIX'
      )}/${contentCatalog}/users/${userId}/orders/${orderCode}?lang=en&curr=USD`,
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    })
    .then(
      (res) => new Promise((resolve) => setTimeout(() => resolve(res), delay))
    )
    .then((res: Cypress.Response) => {
      if (
        elapsedTime > timerTimeout ||
        (res.status === 200 && res.body?.status === 'PENDING_APPROVAL')
      ) {
        return res;
      } else {
        elapsedTime += delay;
        waitForOrderPending(orderCode, contentCatalog, elapsedTime);
      }
    });
}

export function getOrderApprovalListRoute() {
  cy.server();

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals?*`
  ).as('order_approval_list');
}

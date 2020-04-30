import { user } from '../sample-data/checkout-flow';
import { login } from './auth-forms';
import {
  addProductToCart,
  goToProductPageFromCategory,
} from './checkout-as-persistent-user';
import { waitForPage } from './checkout-flow';
import { getSuccessAlert } from './global-message';
import { registerUser } from './register';

export const register = (): void => {
  const loginPage = waitForPage('/login', 'loginPage');
  cy.visit('/login');
  cy.wait(`@${loginPage}`);
  registerUser(user);
  getSuccessAlert();
};

export const loginUser = (): void => {
  const { email, password } = user;
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env('API_URL')}/authorizationserver/oauth/token`
  ).as('login');
  login(email, password);
  cy.wait('@login');
};
export const addProductToShoppingCart: VoidFunction = () => {
  goToProductPageFromCategory();
  addProductToCart();

  let stateAuth: any;
  let cartId;

  cy.window()
    .then((win) =>
      JSON.parse(win.localStorage.getItem('spartacus⚿electronics-spa⚿cart'))
    )
    .then(({ active }) => {
      cartId = active;
    });

  cy.window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus-local-data')))
    .then(({ auth }) => {
      stateAuth = auth;
      return cy.requireProductAddedToCart(stateAuth);
    })
    .then((_) => {
      cy.requireShippingAddressAdded(user.address, stateAuth);
      cy.requireShippingMethodSelected(stateAuth);
      cy.requirePaymentDone(stateAuth);

      return cy.requirePlacedOrder(stateAuth, cartId);
    });
};

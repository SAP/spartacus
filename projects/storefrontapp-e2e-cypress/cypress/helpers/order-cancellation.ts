import { user } from '../sample-data/checkout-flow';
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

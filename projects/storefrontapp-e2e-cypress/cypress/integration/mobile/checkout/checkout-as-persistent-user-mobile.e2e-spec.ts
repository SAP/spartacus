import {
  checkoutAsPersistentUserTest,
  retrieveTokenAndLogin,
} from '../../../helpers/checkout-as-persistent-user';
import * as login from '../../../helpers/login';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Checkout - As a Persistent User`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    retrieveTokenAndLogin();
    cy.reload();
    cy.visit('/');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  checkoutAsPersistentUserTest(true);

  afterEach(() => {
    cy.saveLocalStorage();
  });

  after(() => {
    login.signOutUser();
  });
});

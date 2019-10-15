import {
  retrieveTokenAndLogin,
  checkoutAsPersistentUserTest,
} from '../../../helpers/checkout-as-persistent-user';
import { formats } from '../../../sample-data/viewports';

describe(`${formats.mobile.width +
  1}p resolution - Checkout - As a Persistent User`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.reload();
    cy.visit('/');
    retrieveTokenAndLogin();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  checkoutAsPersistentUserTest();

  afterEach(() => {
    cy.saveLocalStorage();
  });
});

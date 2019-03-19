import * as checkoutAsPersistentUser from '../../helpers/checkout-as-persistent-user';
import { formats } from '../../sample-data/viewports';

context('Check login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });

  checkoutAsPersistentUser.checkoutTestAsPersistentUser();
});

context(`${formats.mobile.width + 1}p resolution - Check login`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  checkoutAsPersistentUser.checkoutTestAsPersistentUser();
});

import { clickHamburger, waitForHomePage } from '../../helpers/homepage';
import * as login from '../../helpers/login';
import { formats } from '../../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Login`, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');

    waitForHomePage();

    login.registerUser();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should login successfully with correct credentials', () => {
    login.loginUser();

    waitForHomePage();

    const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
    login.signOutUser();
    cy.wait(tokenRevocationRequestAlias);
  });

  it('login should fail if password is wrong', () => {
    clickHamburger();
    login.loginWithBadCredentials();
  });
});

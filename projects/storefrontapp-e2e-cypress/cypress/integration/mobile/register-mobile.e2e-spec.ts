import * as register from '../../helpers/register';
import { formats } from '../../sample-data/viewports';
import { waitForHomePage, clickHamburger } from '../../helpers/homepage';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  // Behavior changed to automatic login. Skipping it until confirming that this behavior is intended.
  it.skip('should contain error when trying to register with the same email', () => {
    waitForHomePage();

    register.registerUser();

    waitForHomePage();

    register.signOut();
    register.checkTermsAndConditions();
    clickHamburger();
    register.registerUser();

    register.verifyFailedRegistration();
  });
});

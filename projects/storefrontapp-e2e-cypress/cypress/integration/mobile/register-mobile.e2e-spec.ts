import * as register from '../../helpers/register';
import { formats } from '../../sample-data/viewports';
import {
  waitForHomePage,
  clickHamburger,
  checkBanner,
} from '../../helpers/homepage';
import { user } from '../../sample-data/checkout-flow';

describe(`${formats.mobile.width + 1}p resolution - Register`, () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });

  // Behavior changed to automatic login.
  it('should login when trying to register with the same email and correct password', () => {
    waitForHomePage();
    register.registerUser(user);
    waitForHomePage();
    register.signOut();
    register.navigateToTermsAndConditions();
    register.checkTermsAndConditions();
    clickHamburger();
    register.registerUser(user);
    register.checkTermsAndConditions();
  });

  it('should contain error when trying to register with the same email and different password', () => {
    cy.visit('/');
    waitForHomePage();
    register.registerUser(user);
    waitForHomePage();
    register.signOut();
    clickHamburger();
    register.registerUser({ ...user, password: 'Different123.' });
    register.verifyFailedRegistration();
  });
});

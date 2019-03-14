import * as login from '../../helpers/login';
import { formats } from '../../sample-data/viewports';

function clickHamburger() {
  cy.get('cx-header [aria-label="Menu"]').click();
}

function waitForHomePage() {
  cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
    'exist'
  );
  clickHamburger();
}

describe(`${formats.mobile.width + 1}p resolution - Login`, () => {
  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    waitForHomePage();

    login.loginPageAndRegister();

    waitForHomePage();

    login.verifyUser();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should login successfully with correct credentials', () => {
    clickHamburger();

    login.loginPageAndLogin();

    waitForHomePage();

    login.verifyUser();
  });

  it('login should fail if password is wrong', () => {
    login.verifyFakeLogin();
  });
});

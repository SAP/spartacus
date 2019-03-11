import { user } from '../sample-data/big-happy-path';
import { register, login } from '../helpers/auth-forms';
import { formats } from '../sample-data/viewports';

describe(`${formats.mobile.width + 1}p resolution - Login`, () => {
  const userGreetSelector = 'cx-login .cx-login-status__greet';
  const loginLinkSelector = 'cx-login [role="link"]';

  before(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
      'exist'
    );
    cy.get('cx-header [aria-label="Menu"]').click();
    cy.get(loginLinkSelector).click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);
    cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
      'exist'
    );

    cy.get(userGreetSelector).should('contain', user.fullName);

    cy.get('cx-header [aria-label="Menu"]').click();
    cy.selectUserMenuOption('Sign Out');

    cy.get(userGreetSelector).should('not.exist');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should login successfully with correct credentials', () => {
    cy.get(loginLinkSelector).click();
    login(user.email, user.password);
    cy.get('cx-dynamic-slot .ElectronicsHompageSplashBannerComponent').should(
      'exist'
    );

    cy.get(userGreetSelector).should('contain', user.fullName);

    cy.get('cx-header [aria-label="Menu"]').click();
    cy.selectUserMenuOption('Sign Out');

    cy.get(userGreetSelector).should('not.exist');
  });

  it('login should fail if password is wrong', () => {
    cy.get(loginLinkSelector).click();

    login(user.email, 'Password321');

    cy.get(userGreetSelector).should('not.exist');

    cy.get('cx-global-message .alert-danger').should(
      'contain',
      'Bad credentials. Please login again'
    );
  });
});

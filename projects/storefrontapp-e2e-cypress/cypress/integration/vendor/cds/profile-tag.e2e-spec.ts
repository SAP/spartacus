import * as anonymousConsents from '../../../helpers/anonymous-consents';
import * as loginHelper from '../../../helpers/login';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';

function visitHomePage() {
  return navigation.visitHomePage({
    options: {
      onBeforeLoad: profileTagHelper.interceptProfileTagJs,
    },
  });
}

beforeEach(() => {
  cy.server();
  cdsHelper.setUpMocks();
});
describe.skip('Profile-tag component', () => {
  it('should send a Navigated event when a navigation occurs', () => {
    visitHomePage();
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    cy.get('.Section1.has-components')
      .first()
      .click();
    cy.location('pathname', { timeout: 2000 }).should(
      'include',
      '/OpenCatalogue'
    );
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
    visitHomePage();
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    anonymousConsents.clickAllowAllFromBanner();
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]).to.have.property('name');
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal(
        'ConsentChanged'
      );
    });
  });
});
describe.skip('login notification', () => {
  it('should call the login endpont of EC on a successful login', () => {
    const alias = 'loginNotification';
    cy.route('POST', '**/users/current/loginnotification**').as(alias);
    visitHomePage();
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
    loginHelper.registerUser();
    loginHelper.loginUser();

    cy.wait(`@${alias}`).then(xhr => {
      expect(xhr.request.headers['X-Profile-Tag-Debug']).not.to.be.undefined;
      expect(xhr.request.headers['X-Consent-Reference']).to.eq(
        profileTagHelper.testCr
      );
    });
  });

  it('should not call the login endpont of EC on a failed login', () => {
    const loginAlias = 'loginNotification';
    cy.route('POST', '**/users/current/loginnotification**').as(loginAlias);
    visitHomePage();
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
    loginHelper.registerUser();
    loginHelper.loginWithBadCredentials();
    visitHomePage().then(() => {
      expect(navigation.requestsCount(loginAlias)).eq(0);
    });
  });
});

import * as anonymousConsents from '../../../helpers/anonymous-consents';
import * as loginHelper from '../../../helpers/login';
import { navigation } from '../../../helpers/navigation';
import { cdsHelper } from '../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../helpers/vendor/cds/profile-tag';
describe.skip('Profile-tag component', () => {
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
  });
  it('should send a Navigated event when a navigation occurs', () => {
    const categoryPage = 'CategoryPage';
    navigation.waitForPage(categoryPage);
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).click();
    cy.wait(`@${categoryPage}`)
      .its('status')
      .should('eq', 200);
    cy.window().then(win => {
      expect((<any>win).Y_TRACKING.eventLayer[0]['name']).to.equal('Navigated');
    });
  });
  it('should wait for a user to accept consent and then send a ConsentChanged event', () => {
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
  const loginAlias = 'loginNotification';
  beforeEach(() => {
    cy.server();
    cdsHelper.setUpMocks();
    cy.route('POST', '**/users/current/loginnotification**').as(loginAlias);
    navigation.visitHomePage({});
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
  });
  it('should not call the login endpont of EC on a failed login', () => {
    loginHelper.loginWithBadCredentials();
    navigation.visitHomePage({}).then(() => {
      expect(navigation.requestsCount(loginAlias)).eq(0);
    });
  });
  it('should call the login endpont of EC on a successful login', () => {
    loginHelper.loginAsDefaultUser();
    cy.wait(`@${loginAlias}`).then(xhr => {
      expect(xhr.request.headers['X-Consent-Reference']).to.eq(
        profileTagHelper.testCr
      );
    });
  });
});

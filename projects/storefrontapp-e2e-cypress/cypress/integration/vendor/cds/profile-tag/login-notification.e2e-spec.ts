import * as loginHelper from '../../../../helpers/login';
import { navigation } from '../../../../helpers/navigation';
import {
  cdsHelper,
  strategyRequestAlias,
} from '../../../../helpers/vendor/cds/cds';
import { profileTagHelper } from '../../../../helpers/vendor/cds/profile-tag';

describe('login notification', () => {
  const loginAlias = 'loginNotification';
  beforeEach(() => {
    cdsHelper.setUpMocks(strategyRequestAlias);
    cy.intercept({
      method: 'POST',
      path: '**/users/current/loginnotification**',
    }).as(loginAlias);
    navigation.visitHomePage({
      options: {
        onBeforeLoad: profileTagHelper.interceptProfileTagJs,
      },
    });
    profileTagHelper.waitForCMSComponents();
    profileTagHelper.triggerLoaded();
    profileTagHelper.triggerConsentReferenceLoaded();
  });
  it('should not call the login endpoint of EC on a failed login', () => {
    loginHelper.loginWithBadCredentials();
    navigation
      .visitHomePage({
        options: {
          onBeforeLoad: profileTagHelper.interceptProfileTagJs,
        },
      })
      .then(() => {
        expect(navigation.requestsCount(loginAlias)).eq(0);
      });
  });
  it('should call the login endpoint of EC on a successful login', () => {
    loginHelper.loginAsDefaultUser();
    cy.wait(`@${loginAlias}`).then((xhr) => {
      // xhr request headers have lower case for header names. The actual header is: `X-Consent-Reference`.
      expect(xhr.request.headers['x-consent-reference']).to.eq(
        profileTagHelper.testCr
      );
    });
  });
});

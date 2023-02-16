import {
  ELECTRONICS_BASESITE,
  visitHomePage,
} from '../../../helpers/checkout-flow';
import * as alerts from '../../../helpers/global-message';
import * as isolation from '../../../helpers/multisite-isolation';

export const ELECTRONICS_STANDALONE_BASESITE = 'electronics-standalone';
export const POWERTOOLS_STANDALONE_BASESITE = 'powertools-standalone';

describe('Multisite Isolation', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Non-Standalone authorization', () => {
    beforeEach(() => {
      isolation.setBaseSiteConfig(ELECTRONICS_BASESITE);

      visitHomePage();
    });

    it('should revoke a session on baseSite to the isolated one switch', () => {
      // 1. Login as an newly registered user in electronics-spa (on non-isolated)
      isolation.verifyUserSession();

      // 2. Keep the session and change url into electronics-standalone (isolated)
      isolation.setBaseSiteConfig(ELECTRONICS_STANDALONE_BASESITE);

      // 3. The session should be revoked
      visitHomePage();

      alerts
        .getSuccessAlert()
        .should('contain', 'You have successfully signed out');
    });
  });

  describe('Standalone authorization', () => {
    beforeEach(() => {
      isolation.setBaseSiteConfig(ELECTRONICS_STANDALONE_BASESITE);

      visitHomePage();
    });

    it('should authenticate the customer on the isolated baseSite', () => {
      isolation.verifyUserSession();
    });
  });
});

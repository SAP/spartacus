import * as siteContextSelector from '../../../../helpers/site-context-selector';
import { waitForOrderToBePlacedRequest } from '../../../../support/utils/order-placed';

describe('Language switch - my-account pages', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );
  siteContextSelector.stub(
    siteContextSelector.TITLE_REQUEST,
    siteContextSelector.TITLES
  );
  describe('order page', () => {
    const orderPath = siteContextSelector.ORDER_PATH;
    const deutschName = siteContextSelector.MONTH_DE;

    before(() => {
      siteContextSelector.doPlaceOrder();
      waitForOrderToBePlacedRequest();
    });

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        orderPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + orderPath
      );
    });

    it('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        orderPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.get(
        'cx-order-history .cx-order-history-placed .cx-order-history-value'
      ).should('contain', deutschName);
    });
  });

  describe('personal details page', () => {
    const personalDetailsPath = siteContextSelector.PERSONAL_DETAILS_PATH;
    const deutschName = siteContextSelector.TITLE_DE;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        personalDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + personalDetailsPath
      );
    });

    it('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        personalDetailsPath,
        siteContextSelector.TITLES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.get('cx-update-profile form select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });
});

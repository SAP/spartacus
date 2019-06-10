import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - payment-details page', () => {
  const paymentDetailsPath = siteContextSelector.PAYMENT_DETAILS_PATH;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('payment-details page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChange(paymentDetailsPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(paymentDetailsPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});

import * as siteContextSelector from '../../../../helpers/site-context-selector';

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

  // Core test.
  siteContextSelector.testLangSwitchOrderPage();

  // Below tests depend on core test for setup.
  describe('address book page', () => {
    const addressBookPath = siteContextSelector.ADDRESS_BOOK_PATH;
    const deutschName = siteContextSelector.TITLE_DE;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        addressBookPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + addressBookPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        addressBookPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });

    it('should change language in the edit page', () => {
      siteContextSelector.siteContextChange(
        addressBookPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      cy.get('cx-address-book button').contains('Edit').click({ force: true });

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"]'
      ).ngSelect(deutschName);

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"] .ng-value-label'
      ).should('have.text', deutschName);
    });
  });

  // Core test
  siteContextSelector.testPersonalDetailsPage();

  // Below tests depend on core test for setup.
  describe('close account page', () => {
    const closeAccountPath = siteContextSelector.CLOSE_ACCOUNT_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        closeAccountPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + closeAccountPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        closeAccountPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('consent management page', () => {
    const consentManagementPath = siteContextSelector.CONSENT_MANAGEMENT_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        consentManagementPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + consentManagementPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        consentManagementPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('payment-details page', () => {
    const paymentDetailsPath = siteContextSelector.PAYMENT_DETAILS_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        paymentDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + paymentDetailsPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        paymentDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('update-email page', () => {
    const updateEmailPath = siteContextSelector.UPDATE_EMAIL_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        updateEmailPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + updateEmailPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        updateEmailPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('update-password page', () => {
    const updatePasswordPath = siteContextSelector.UPDATE_PASSWORD_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        updatePasswordPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + updatePasswordPath
      );
    });

    xit('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        updatePasswordPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});

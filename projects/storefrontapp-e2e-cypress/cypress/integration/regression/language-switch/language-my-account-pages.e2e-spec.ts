import * as siteContextSelector from '../../../helpers/site-context-selector';
import { user } from '../../../sample-data/checkout-flow';

describe('Language switch - my-account pages', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('order page', () => {
    const orderPath = siteContextSelector.ORDER_PATH;
    const deutschName = siteContextSelector.MONTH_DE;

    function doPlaceOrder() {
      cy.window().then(win => {
        const savedState = JSON.parse(
          win.localStorage.getItem('spartacus-local-data')
        );
        cy.requireProductAddedToCart(savedState.auth).then(resp => {
          cy.requireShippingAddressAdded(user.address, savedState.auth);
          cy.requireShippingMethodSelected(savedState.auth);
          cy.requirePaymentDone(savedState.auth);
          cy.requirePlacedOrder(savedState.auth, resp.cartId);
        });
      });
    }

    before(() => {
      doPlaceOrder();
    });

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(orderPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(orderPath);

      cy.get(
        'cx-order-history .cx-order-history-placed .cx-order-history-value'
      )
        .invoke('text')
        .should('contains', deutschName);
    });
  });

  describe('address book page', () => {
    const addressBookPath = siteContextSelector.ADDRESS_BOOK_PATH;
    const deutschName = siteContextSelector.TITLE_DE;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(addressBookPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(addressBookPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });

    it('should change language in the edit page', () => {
      siteContextSelector.languageChange(addressBookPath);
      cy.get('cx-address-book .edit').click({ force: true });

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"]'
      ).ngSelect(deutschName);

      cy.get(
        'cx-address-form .ng-select[formcontrolname="titleCode"] .ng-value-label'
      ).should('have.text', deutschName);
    });
  });

  describe('personal details page', () => {
    const personalDetailsPath = siteContextSelector.PERSONAL_DETAILS_PATH;
    const deutschName = siteContextSelector.TITLE_DE;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(personalDetailsPath);
    });

    it('should change language in the page', () => {
      siteContextSelector.languageChange(personalDetailsPath);

      cy.get('cx-update-profile-form select')
        .select(deutschName)
        .should('have.value', 'mr');
    });
  });

  describe('close account page', () => {
    const closeAccountPath = siteContextSelector.CLOSE_ACCOUNT_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(closeAccountPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(closeAccountPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('consent management page', () => {
    const consentManagementPath = siteContextSelector.CONSENT_MANAGEMENT_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(consentManagementPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(consentManagementPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('payment-details page', () => {
    const paymentDetailsPath = siteContextSelector.PAYMENT_DETAILS_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(paymentDetailsPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(paymentDetailsPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('update-email page', () => {
    const updateEmailPath = siteContextSelector.UPDATE_EMAIL_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(updateEmailPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(updateEmailPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });

  describe('update-password page', () => {
    const updatePasswordPath = siteContextSelector.UPDATE_PASSWORD_PATH;

    it('should change language in the url', () => {
      siteContextSelector.verifyLanguageChangeUrl(updatePasswordPath);
    });

    xit('should change language in the page', () => {
      siteContextSelector.languageChange(updatePasswordPath);
      // TODO: need to add test when there's translations on that page (not the header)
    });
  });
});

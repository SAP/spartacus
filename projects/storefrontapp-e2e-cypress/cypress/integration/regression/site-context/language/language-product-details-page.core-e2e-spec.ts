import * as siteContextSelector from '../../../../helpers/site-context-selector';

describe('Language switch - product-details page', () => {
  const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
  const deutschName = siteContextSelector.PRODUCT_NAME_DETAILS_DE;

  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  siteContextSelector.stub(
    siteContextSelector.LANGUAGE_REQUEST,
    siteContextSelector.LANGUAGES
  );

  describe('product-details page', () => {
    it('should change language in the url', () => {
      siteContextSelector.verifySiteContextChangeUrl(
        productDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL,
        siteContextSelector.FULL_BASE_URL_DE_USD + productDetailsPath
      );
    });

    it('should change language in the page', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.get('cx-product-summary .summary').should('have.text', deutschName);
    });

    it('should change language in the modal', () => {
      siteContextSelector.siteContextChange(
        productDetailsPath,
        siteContextSelector.LANGUAGES,
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );

      cy.get('cx-add-to-cart button.btn-primary').click();
      cy.get('cx-added-to-cart-dialog .cx-link').should('contain', deutschName);
    });
  });
});

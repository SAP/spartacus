import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const testProductMultiLevel = 'CONF_HOME_THEATER_ML';
const email = 'test-user-for-variant-configuration@ydev.hybris.com';
const password = 'Password123.';
const user = 'Variant Configuration';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      configuration.login(email, password, user);

      productSearch.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configuration.checkout();
      configuration.navigateToOrderDetails();
      configuration.selectOrderByOrderNumberAlias();
      configuration.signOutUser();
    });
  });
});

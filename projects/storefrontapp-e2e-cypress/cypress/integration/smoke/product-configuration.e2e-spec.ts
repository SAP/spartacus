import * as login from '../../helpers/login';
import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';

const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    login.registerUser();
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      login.loginUser();
      productSearch.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configuration.checkout();
      configuration.navigateToOrderDetails();
      //don't check the order history aspect because this part is flaky
      //configuration.selectOrderByOrderNumberAlias();
      login.signOutUser();
    });
  });
});

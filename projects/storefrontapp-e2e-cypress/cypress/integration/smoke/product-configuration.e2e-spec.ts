import * as configuration from '../../helpers/product-configuration';
import * as productSearch from '../../helpers/product-search';
import * as login from '../../helpers/login';

const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Order Confirmation and Order History', () => {
    it('Navigation to Overview Page for order confirmation and order history', () => {
      configuration.login();
      productSearch.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configuration.checkout();
      configuration.navigateToOrderDetails();
      configuration.goToOrderHistory();
      //pass wrong order number to test error case
      cy.waitForOrderToBePlacedRequest('electronics-spa', 'USD', '12345');

      //configuration.selectOrderByOrderNumberAlias();
      login.signOutUser();
    });
  });
});

import * as configuration from '../../helpers/product-configuration';
import * as login from '../../helpers/login';
import * as productSearch from '../../helpers/product-search';
//import {signOutUser} from '../../helpers/checkout-flow';
//import { user } from '../../sample-data/checkout-flow';

const testProductMultiLevel = 'CONF_HOME_THEATER_ML';

context('Product Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
    login.registerUser();
  });

  describe('Configuration process', () => {
    it('should support the product configuration aspect in product search, cart, checkout and order history', () => {
      //configuration.login();
      login.loginUser();
      productSearch.searchForProduct(testProductMultiLevel);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configuration.checkout();
      configuration.navigateToOrderDetails();
      configuration.selectOrderByOrderNumberAlias();
      //configuration.signOutUser();
      //signOutUser(user);
      login.signOutUser();
    });
  });
});

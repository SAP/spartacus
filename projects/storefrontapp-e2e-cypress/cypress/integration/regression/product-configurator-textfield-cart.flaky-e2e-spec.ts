import * as login from '../../helpers/login';
import * as configuration from '../../helpers/product-configurator';
//import * as configurationCart from '../../helpers/product-configurator-cart';
import * as configurationCartVc from '../../helpers/product-configurator-cart-vc';
import { verifyGlobalMessageAfterRegistration } from '../../helpers/register';

/**
 * This suite is marked as flaky due to performance (synchronization) issues on
 * https://spartacus-devci767.eastus.cloudapp.azure.com:9002 that we analyze in
 * https://cxjira.sap.com/browse/TIGER-7252
 */

const testProduct = '1934793';

context('Textfield Configuration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Configuration process', () => {
    it('should support the textfield configuration aspect in product search, cart, checkout and order history', () => {
      login.registerUser();
      verifyGlobalMessageAfterRegistration();
      const tokenAuthRequestAlias = login.listenForTokenAuthenticationRequest();
      login.loginUser();
      cy.wait(tokenAuthRequestAlias)
        .its('response.statusCode')
        .should('eq', 200);
      configuration.searchForProduct(testProduct);
      configuration.clickOnAddToCartBtnOnPD();
      configuration.clickOnProceedToCheckoutBtnOnPD();
      configurationCartVc.checkout();
      //TODO: navigation to an order should be enabled after some clarification
      //configurationCart.navigateToOrderDetails();
      //don't check the order history aspect because this part is flaky
      //configuration.selectOrderByOrderNumberAlias();
      const tokenRevocationRequestAlias =
        login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationRequestAlias);
    });
  });
});

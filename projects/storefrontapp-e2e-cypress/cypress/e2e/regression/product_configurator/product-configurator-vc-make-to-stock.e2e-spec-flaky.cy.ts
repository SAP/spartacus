import * as common from '../../../helpers/common';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as cart from '../../../helpers/cart';
import * as configurationCart from '../../../helpers/product-configurator-cart';
import * as configurationOverview from '../../../helpers/product-configurator-overview';
import * as configuration from '../../../helpers/product-configurator';
import * as configurationOverviewVc from '../../../helpers/product-configurator-overview-vc';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL-STD-METALLIC';

context('Product Configuration', () => {
  beforeEach(() => {
    configurationVc.registerConfigurationRoute();
    configurationVc.registerConfigurationUpdateRoute();
    configurationOverviewVc.registerConfigurationOverviewRoute();
    cy.visit('/');
    clickAllowAllFromBanner();
  });

  describe('Support Make-to-Stock for Product Variants (CXSPA-5951)', () => {
    describe('support back navigation to the product detail page after clicking Show Details button', () => {
      it('should display a product overview from the catalog', () => {
        configuration.searchForProduct(testProduct);
        configurationVc.clickOnShowDetailsBtn(testProduct);
        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverview.clickCloseBtnOnOP();
      });

      it('should display a product overview from the products details page', () => {
        common.goToPDPage(electronicsShop, testProduct);
        configurationVc.clickOnShowDetailsBtn(testProduct);
        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverview.clickCloseBtnOnOP();
      });
    });

    describe('support back navigation to the cart page after clicking Display Configuration link', () => {
      afterEach(() => {
        cart.verifyCartNotEmpty();
        cart.removeCartItem({ name: testProduct });
        configurationCart.checkCartEmpty();
      });

      it('should add a product to the cart from the catalog and display a product overview', () => {
        configuration.searchForProduct(testProduct);
        common.clickOnAddToCartBtnOnPD();
        common.clickOnConfigurationLink(true);
        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverview.clickCloseBtnOnOP(false, true);
      });

      it('should add a product to the cart from the product details page and display a product overview', () => {
        common.goToPDPage(electronicsShop, testProduct);
        common.clickOnAddToCartBtnOnPD();
        common.clickOnConfigurationLink(true);
        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverview.clickCloseBtnOnOP(false, true);
      });

      it('should add a product directly to the cart and display a product overview', () => {
        common.goToPDPage(electronicsShop, testProduct);
        common.clickOnAddToCartBtnOnPD();
        common.clickOnViewCartBtnOnPD();
        cart.verifyCartNotEmpty();
        configurationCart.clickOnDisplayConfigurationLink(0);
        configurationOverview.checkConfigOverviewPageDisplayed();
        configurationOverview.clickCloseBtnOnOP(false, true);
      });
    });

    describe('support back navigation to the checkout page after clicking Display Configuration link', () => {
      it('should proceed to checkout and display a product overview', () => {
        configuration.completeOrderProcess(testProduct, true);
      });
    });
  });
});

import * as common from '../../../helpers/common';
import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';
import * as configurationVc from '../../../helpers/product-configurator-vc';
import * as cart from '../../../helpers/cart';
import * as configurationCart from '../../../helpers/product-configurator-cart';
import * as configurationOverview from '../../../helpers/product-configurator-overview';

const electronicsShop = 'electronics-spa';
const testProduct = 'CONF_CAMERA_SL-STD-METALLIC';

context('Product Configuration', () => {
  beforeEach(() => {
    common.goToPDPage(electronicsShop, testProduct);
    clickAllowAllFromBanner();
  });

  describe('Support Make-to-Stock for Product Variants (CXSPA-5951)', () => {
    it('should be able to navigate from the product details page to the product overview', () => {
      configurationVc.clickOnShowDetailsBtn(testProduct);
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationOverview.clickCloseBtnOnOP(true, false);
    });

    it('should be able to navigate from the cart to the product overview', () => {
      common.clickOnAddToCartBtnOnPD();
      common.clickOnViewCartBtnOnPD();
      cart.verifyCartNotEmpty();
      configurationCart.clickOnDisplayConfigurationLink(0);
      configurationOverview.checkConfigOverviewPageDisplayed();
      configurationOverview.clickCloseBtnOnOP(false, true);
      cart.removeCartItem({ name: testProduct });
      configurationCart.checkCartEmpty();
    });
  });
});

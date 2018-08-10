import { ProductDetailsPage } from '../pages/productDetails.po';
import { E2EUtil } from './../util.po';

describe('Product Detail', () => {
  let productDetails: ProductDetailsPage;
  beforeEach(() => {
    productDetails = new ProductDetailsPage();
  });

  it('should be unable to add out of stock products to cart', () => {
    // go to homepage
    // home.navigateTo();

    productDetails.navigateTo('358639');
    // wait until product details page is loaded
    E2EUtil.wait4VisibleElement(productDetails.getPage());

    // there should be no add to cart button, and should be an 'Out of stock' message instead
    expect(productDetails.getAddToCartComponent().isPresent()).toBeFalsy();
    expect(productDetails.getOutOfStockDiv().isDisplayed()).toBeTruthy();
  });
});

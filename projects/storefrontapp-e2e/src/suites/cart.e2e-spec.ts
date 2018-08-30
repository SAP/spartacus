import { browser, by, ExpectedConditions, promise } from 'protractor';
import { AddedToCartModal } from '../page-objects/cmslib/addedToCartModal.po';
import { CartPage } from '../page-objects/cart/cart.po';
import { HomePage } from '../page-objects/home.po';
import { SearchResultsPage } from '../page-objects/search-results.po';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { E2EUtil } from '../e2e-util';

describe('Cart interactions', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let cart: CartPage;
  let productDetails: ProductDetailsPage;

  beforeEach(async () => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    cart = new CartPage();
    productDetails = new ProductDetailsPage();
  });

  /**
   * Full interaction. Search 2 products, add to cart, then verify totals in cart.
   */
  it('should add products to cart', async () => {
    // go to homepage
    await home.navigateTo();

    // FIXME - add register and login steps

    // search for camera
    await home.header.performSearch('camera');
    // wait for search results page to show up
    await browser.wait(ExpectedConditions.urlContains('/search/camera'));

    await E2EUtil.wait4VisibleElement(searchResults.page);
    // select one product by name and add it to the cart

    const product1 = searchResults.findProductByNameInResultsPage(
      'Photosmart E317 Digital Camera'
    );


    expect(await product1.isDisplayed()).toBeTruthy();

    await searchResults.clickAddToCartButton4Product(product1);

    // quantity should change
    const product1QuantitySpan = searchResults.getProductQuantitySpan(product1);

    await E2EUtil.checkTextValue(
      product1QuantitySpan,
      '1',
      'Wrong add to cart button quantity in search results page'
    );
    const atcModal: AddedToCartModal = new AddedToCartModal();

    await atcModal.closeModalWait();

    // search for specific product, but do not press enter
    await home.header.performSearch('1934793', true);

    const overlay = E2EUtil.getOverlayContainer();
    await E2EUtil.wait4VisibleElement(overlay);
    const autocompletePanel = E2EUtil.getComponentWithinParentByCss(
      overlay,
      `div[role="listbox"]`
    );
    await E2EUtil.wait4VisibleElement(autocompletePanel);
    // select product from the suggestion list, then add it to cart 2 times
    const suggestionSpan = autocompletePanel
      .all(by.cssContainingText('.mat-option-text', 'PowerShot A480'))
      .first();
    await suggestionSpan.click();

    // wait until product details page is loaded
    await E2EUtil.wait4VisibleElement(productDetails.page);
    await productDetails.addToCart();
    await browser.waitForAngular();
    // quantity should change
    const product2QuantitySpan = productDetails.productQuantitySpan;
    await E2EUtil.checkTextValue(
      product2QuantitySpan,
      '1',
      'Wrong product details add to cart button quantity'
    );
    // close add to cart modal

    await atcModal.closeModalWait();

    // add same product to cart again
    await productDetails.addToCart();

    await atcModal.waitForReady();

    await atcModal.closeModalWait();

    await E2EUtil.checkTextValue(
      product2QuantitySpan,
      '2',
      'Wrong product details add to cart button quantity'
    );

    const minicartIcon = home.header.minicartIconComponent;
    await browser.wait(ExpectedConditions.elementToBeClickable(minicartIcon));

    await minicartIcon.click();

    // wait for cart page to show up
    await browser.wait(ExpectedConditions.urlContains('/cart'));
    // check if cart contains quantity 1 of 'Photosmart E317 Digital Camera'

    await cart.checkCartEntry(
      'Photosmart E317 Digital Camera',
      1,
      '$114.12',
      '$114.12'
    );

    // check if cart contains quantity 2 of 'PowerShot A480'
    await cart.checkCartEntry('PowerShot A480', 2, '$99.85', '$199.70');

    // check cart totals
    await cart.checkCartSummary('$293.82', '$20.00', '$293.82');
  });

  it('should be unable to add out of stock products to cart', async () => {
    // go to homepage
    await home.navigateTo();

    await productDetails.navigateTo('358639');
    // wait until product details page is loaded
    await E2EUtil.wait4VisibleElement(productDetails.page);

    // there should be no add to cart button, and should be an 'Out of stock' message instead
    expect(
      await productDetails.addToCartComponent.isPresent()
    ).toBeFalsy();
    expect(await productDetails.outOfStockDiv.isDisplayed()).toBeTruthy();
  });
});

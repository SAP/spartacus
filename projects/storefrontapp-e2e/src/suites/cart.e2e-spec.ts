import { browser, ExpectedConditions } from 'protractor';
import { CartPage } from '../page-objects/cart/cart.po';
import { HomePage } from '../page-objects/home.po';
import { SearchResultsPage } from '../page-objects/search-results.po';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { E2EUtil } from '../e2e-util';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';

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
    searchResults.waitForReady();

    // select one product by name and add it to the cart
    const product1 = searchResults.productByNameInResults(
      'Photosmart E317 Digital Camera'
    );

    expect(await product1.isDisplayed()).toBeTruthy();

    await searchResults.clickAddToCartButton4Product(product1);

    const atcModal: AddedToCartModal = new AddedToCartModal();
    await atcModal.waitForReady();

    // quantity should change
    const product1QuantitySpan = searchResults.getProductQuantitySpan(product1);
    expect(await product1QuantitySpan.getText()).toEqual(
      '1',
      'Wrong add to cart button quantity in search results page'
    );

    await atcModal.closeModalWait();

    // TODO: Implement test for autocomplete product search
    // // search for specific product, but do not press enter
    // await home.header.performSearch('1934793', true);

    // const autocompletePanel = new AutocompletePanel();
    // await autocompletePanel.waitForReady();

    // // select product from the suggestion list, then add it to cart 2 times
    // await autocompletePanel.selectProduct('PowerShot A480');

    // // wait until product details page is loaded
    // await productDetails.waitForReady();
    // await productDetails.addToCart();
    // await atcModal.waitForReady();

    // // quantity should change
    // expect(await productDetails.getProductQuantity()).toEqual(
    //   '1',
    //   'Wrong product details add to cart button quantity'
    // );

    // // close add to cart modal
    // await atcModal.closeModalWait();

    // // add same product to cart again
    // await productDetails.addToCart();

    // await atcModal.waitForReady();

    // await atcModal.closeModalWait();

    // expect(await productDetails.getProductQuantity()).toEqual(
    //   '2',
    //   'Wrong product details add to cart button quantity'
    // );

    const minicartIcon = home.header.miniCartButton;
    await browser.wait(ExpectedConditions.elementToBeClickable(minicartIcon));

    await minicartIcon.click();

    // wait for cart page to show up
    await cart.waitForReady();

    // check if cart contains quantity 1 of 'Photosmart E317 Digital Camera'
    await cart.checkCartEntry(
      'Photosmart E317 Digital Camera',
      1,
      '$114.12',
      '$114.12'
    );

    // // check if cart contains quantity 2 of 'PowerShot A480'
    // await cart.checkCartEntry('PowerShot A480', 2, '$99.85', '$199.70');

    // // check cart totals
    // await cart.checkCartSummary('$293.82', '$20.00', '$293.82');
  });

  it('should be unable to add out of stock products to cart', async () => {
    // go to homepage
    await home.navigateTo();

    await productDetails.navigateTo('358639');
    // wait until product details page is loaded
    await E2EUtil.wait4VisibleElement(productDetails.page);

    // there should be no add to cart button, and should be an 'Out of stock' message instead
    expect(await productDetails.addToCartComponent.isPresent()).toBeFalsy();
    expect(await productDetails.outOfStockDiv.isDisplayed()).toBeTruthy();
  });
});

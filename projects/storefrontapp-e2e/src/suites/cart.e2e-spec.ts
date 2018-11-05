import { CartPage } from '../page-objects/cart/cart.po';
import { HomePage } from '../page-objects/home.po';
import { SearchResultsPage } from '../page-objects/search-results.po';
import { ProductDetailsPage } from '../page-objects/product-details.po';
import { E2EUtil } from '../e2e-util';
import { AddedToCartModal } from '../page-objects/cmslib/added-to-cart-modal.po';
import { AutocompletePanel } from '../page-objects/cmslib/autocomplete-panel.po';

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
  it('should add products to cart via search autocomplete', async () => {
    await home.navigateTo();
    await home.header.performSearch('1934793', true);

    const autocompletePanel = new AutocompletePanel();
    await autocompletePanel.waitForReady();

    // select product from the suggestion list, then add it to cart 2 times
    await autocompletePanel.selectProduct('PowerShot A480');

    // wait until product details page is loaded
    await productDetails.waitForReady();
    await productDetails.addToCart();
    const atcModal: AddedToCartModal = new AddedToCartModal();
    await atcModal.waitForReady();
    await atcModal.closeButton.click();

    const minicartIcon = home.header.miniCartButton;
    await E2EUtil.wait4VisibleElement(minicartIcon);
    expect(await home.header.miniCartButton.getText()).toContain('1');

    await minicartIcon.click();

    // wait for cart page to show up
    await cart.waitForReady();

    await cart.checkCartEntry('PowerShot A480', 1, '$99.85', '$99.85');
    await home.navigateTo();
  });

  it('should add products to cart', async () => {
    // go to homepage
    await home.navigateTo();

    // search for camera
    await home.header.performSearch('camera');

    // wait for search results page to show up
    await searchResults.waitForReady();

    // select one product by name and add it to the cart
    const product1 = await searchResults.productByNameInResults(
      'Photosmart E317 Digital Camera'
    );

    expect(await product1.isDisplayed()).toBeTruthy();
    await searchResults.clickAddToCartButton4Product(product1);
    const atcModal: AddedToCartModal = new AddedToCartModal();
    await atcModal.waitForReady();
    const item = atcModal.item;
    await E2EUtil.wait4VisibleElement(item);

    await atcModal.closeButton.click();

    const minicartIcon = home.header.miniCartButton;
    await E2EUtil.wait4VisibleElement(minicartIcon);
    expect(await home.header.miniCartButton.getText()).toContain('1');

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
    // go to homepage
    await home.navigateTo();
  });

  // TODO: We need that product on backend to be out of stock
  xit('should be unable to add out of stock products to cart', async () => {
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

import { browser, by, ExpectedConditions, promise } from 'protractor';

import { AddedToCartModal } from './cmslib/addedToCartModal.po';
import { ProductDetailsPage } from './pages/productDetails.po';
import { CartPage } from './pages/cart.po';
import { SearchResultsPage } from './pages/searchResults.po';
import { HomePage } from './pages/home.po';
import { E2EUtil } from './util.po';

describe('workspace-project App', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let cart: CartPage;
  let productDetails: ProductDetailsPage;

  beforeEach(() => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    cart = new CartPage();
    productDetails = new ProductDetailsPage();
  });

  it('should display title', () => {
    home.navigateTo();
    expect<promise.Promise<string>>(home.getBrowserPageTitle()).toEqual(
      'Spaccelerator'
    );
  });

  it('should have site logo', () => {
    // go to homepage
    home.navigateTo();
    // check if site logo is present
    const siteLogoComponent = home.header.getSiteLogoComponent();
    expect<promise.Promise<boolean>>(siteLogoComponent.isPresent()).toEqual(
      true
    );
  });

  it('should be able to search', () => {
    // go to homepage
    home.navigateTo();
    // search for camera
    home.header.performSearch('camera');
    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 5000);
  });

  it('should have splash banner', () => {
    // go to homepage
    home.navigateTo();
    // check if site logo is present
    const splashBannerComponent = home.getSplashBanner();
    expect<promise.Promise<boolean>>(splashBannerComponent.isPresent()).toEqual(
      true
    );
  });

  it('should list cameras in page', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'));

    // should show 10 results on page and should have Photosmart camera
    const results = searchResults.getProductListItems();

    results.then(items => {
      expect(items.length).toBe(10);

      // FIXME - by now results do not come ordered from occ. Get top element when it does.
      // const h3 = items[0].element(by.tagName('h3'));
      // h3.getText().then((text) => {
      //   expect(text).toBe('Photosmart E317 Digital Camera');
      // });
    });

    searchResults
      .findProductByNameInResultsPage('Photosmart E317 Digital Camera')
      .then(product => {
        expect(product.isDisplayed()).toBeTruthy();
      });
  });

  it('should list with pagination', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'));

    // should have 144 results and 15 pages
    const pagination = searchResults.getPagination();
    pagination
      .all(by.tagName('div'))
      .first()
      .getText()
      .then(text => {
        expect(text).toContain('144 Products');
        expect(text).toContain('Page: 1 of 15');
      });

    // go to next page
    // FIXME - commented out by now, as it is broken on spartacus
    // const nextButton = pagination.element(by.css('pagination-next'));
    // nextButton.click();
  });

  /**
   * Full interaction. Search 2 products, add to cart, then verify totals in cart.
   */
  it('should add products to cart', () => {
    // go to homepage
    home.navigateTo();

    // FIXME - add register and login steps

    // search for camera
    home.header.performSearch('camera');
    // wait for search results page to show up
    browser.wait(ExpectedConditions.urlContains('/search/camera'));
    browser.wait(searchResults.getPage().isDisplayed());
    // select one product by name and add it to the cart
    searchResults
      .findProductByNameInResultsPage('Photosmart E317 Digital Camera')
      .then(product1 => {
        expect(product1.isDisplayed()).toBeTruthy();
        return product1;
      })
      .then(product1 => {
        searchResults.clickAddToCartButton4Product(product1);
        // quantity should change
        const product1QuantitySpan = searchResults.getProductQuantitySpan(
          product1
        );
        E2EUtil.checkTextValue(
          product1QuantitySpan,
          '1',
          'Wrong add to cart button quantity in search results page'
        ).then(() => {
          const atcModal: AddedToCartModal = new AddedToCartModal();
          atcModal.closeModalWait();
        });
      });

    // search for specific product, but do not press enter
    home.header.performSearch('1934793', true);

    const overlay = E2EUtil.getOverlayContainer();
    E2EUtil.wait4VisibleElement(overlay);
    const autocompletePanel = E2EUtil.getComponentWithinParentByCss(
      overlay,
      `div[role="listbox"]`
    );
    E2EUtil.wait4VisibleElement(autocompletePanel);
    // select product from the suggestion list, then add it to cart 2 times
    const suggestionSpan = autocompletePanel
      .all(by.cssContainingText('.mat-option-text', 'PowerShot A480'))
      .first();
    suggestionSpan.click();
    // wait until product details page is loaded
    E2EUtil.wait4VisibleElement(productDetails.getPage());
    productDetails.addToCart();
    browser.waitForAngular();
    // quantity should change
    const product2QuantitySpan = productDetails.getProductQuantitySpan();
    E2EUtil.checkTextValue(
      product2QuantitySpan,
      '1',
      'Wrong product details add to cart button quantity'
    )
      .then(() => {
        // close add to cart modal
        const atcModal: AddedToCartModal = new AddedToCartModal();
        atcModal.closeModalWait();
      })
      .then(() => {
        // add same product to cart again
        productDetails.addToCart();
        browser.waitForAngular();
        const atcModal: AddedToCartModal = new AddedToCartModal();
        atcModal
          .closeModalWait()
          .then(() => {
            E2EUtil.checkTextValue(
              product2QuantitySpan,
              '2',
              'Wrong product details add to cart button quantity'
            );
          }) // then go to cart
          .then(() => {
            const minicartIcon = home.header.getMinicartIconComponent();
            browser
              .wait(ExpectedConditions.elementToBeClickable(minicartIcon))
              .then(() => {
                minicartIcon.click();
              });
          });
      });

    // wait for cart page to show up
    browser.wait(ExpectedConditions.urlContains('/cart'));
    // check if cart contains quantity 1 of 'Photosmart E317 Digital Camera'
    cart.checkCartEntry(
      'Photosmart E317 Digital Camera',
      1,
      '$114.12',
      '$114.12'
    );
    // check if cart contains quantity 2 of 'PowerShot A480'
    cart.checkCartEntry('PowerShot A480', 2, '$99.85', '$199.70');

    // check cart totals
    cart.checkCartSummary('$293.82', '$20.00', '$293.82');
  });

  it('should be unable to add out of stock products to cart', () => {
    // go to homepage
    home.navigateTo();

    productDetails.navigateTo('358639');
    // wait until product details page is loaded
    E2EUtil.wait4VisibleElement(productDetails.getPage());

    // there should be no add to cart button, and should be an 'Out of stock' message instead
    expect(productDetails.getAddToCartComponent().isPresent()).toBeFalsy();
    expect(productDetails.getOutOfStockDiv().isDisplayed()).toBeTruthy();
  });
});

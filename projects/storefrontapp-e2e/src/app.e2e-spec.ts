import { AddedToCartModal } from './cmslib/addedToCartModal.po';
import { Input } from '@angular/core';
import { ProductDetailsPage } from './pages/productDetails.po';
import { CartPage } from './pages/cart.po';
import { E2EUtil } from './util.po';
import { browser, by, ExpectedConditions, promise } from 'protractor';
import { SearchResultsPage } from './pages/searchResults.po';
import { HomePage } from './pages/home.po';

describe('workspace-project App', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let cart: CartPage;
  let productDetails: ProductDetailsPage;
  let timestamp: number;

  beforeEach(() => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    cart = new CartPage();
    productDetails = new ProductDetailsPage();
    timestamp = Date.now();
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
    const splashBannerComponent = home.getSplahBanner();
    expect<promise.Promise<boolean>>(splashBannerComponent.isPresent()).toEqual(
      true
    );
  });

  it('should list cameras in page', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 2000);

    // should show 10 results on page and should have Photosmart camera
    const results = searchResults.getProductListItems();

    results.then(function(items) {
      expect(items.length).toBe(10);

      // FIXME - by now results do not come ordered from occ. Get top element when it does.
      // const h3 = items[0].element(by.tagName('h3'));
      // h3.getText().then(function(text) {
      //   expect(text).toBe('Photosmart E317 Digital Camera');
      // });
    });

    searchResults
      .findProductByNameInResultsPage('Photosmart E317 Digital Camera')
      .then(function(product) {
        expect(product.isDisplayed()).toBeTruthy();
      });
  });

  fit('should list with pagination', () => {
    // go to search results page
    searchResults.navigateTo('camera');

    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 2000);

    // should have 144 results and 15 pages
    const pagination = searchResults.getPagination();
    pagination
      .element(by.tagName('div'))
      .getText()
      .then(function(text) {
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
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 2000);
    browser.wait(searchResults.getPage().isDisplayed(), 2000);
    // select one product by name and add it to the cart
    searchResults
      .findProductByNameInResultsPage('Photosmart E317 Digital Camera')
      .then(function(product1) {
        expect(product1.isDisplayed()).toBeTruthy();
        return product1;
      })
      .then(function(product1) {
        const addToCartButton = searchResults.getAddToCartInProductListItem(
          product1
        );
        addToCartButton
          .element(by.cssContainingText('button', 'Add to Cart'))
          .click();
        // quantity should change
        const product1QuantitySpan = E2EUtil.getComponentWithinParentByCss(
          product1,
          'span[class="entry-quantity ng-star-inserted"]'
        );
        browser
          .wait(ExpectedConditions.visibilityOf(product1QuantitySpan), 3000)
          .then(function() {
            product1QuantitySpan.getText().then(function(text) {
              expect(text).toBe(
                '1',
                'Wrong add to cart button quantity in search results page'
              );
            });
            AddedToCartModal.closeModal();
          });
      });

    // search for specific product, but do not press enter
    home.header.performSearch('1934793', true);

    const overlay = E2EUtil.getOverlayContainer();
    browser.wait(ExpectedConditions.visibilityOf(overlay), 2000);
    const autocompletePanel = E2EUtil.getComponentWithinParentByCss(
      overlay,
      `div[role="listbox"]`
    );
    browser.wait(ExpectedConditions.visibilityOf(autocompletePanel), 2000);
    // select product from the suggestion list, then add it to cart 2 times
    const suggestionSpan = autocompletePanel
      .all(by.cssContainingText('.mat-option-text', 'PowerShot A480'))
      .first();
    suggestionSpan.click();
    // wait until product details page is loaded
    browser.wait(
      ExpectedConditions.visibilityOf(productDetails.getPage()),
      2000
    );
    productDetails.addToCart();
    // quantity should change
    const product2QuantitySpan = E2EUtil.getComponentWithinParentByCss(
      productDetails.getAddToCartComponent(),
      'span[class="entry-quantity ng-star-inserted"]'
    );
    browser
      .wait(ExpectedConditions.visibilityOf(product2QuantitySpan), 3000)
      .then(function() {
        product2QuantitySpan.getText().then(function(text) {
          expect(text).toBe(
            '1',
            'Wrong product details add to cart button quantity'
          );
        });
        // close add to cart modal
        AddedToCartModal.closeModal();
      });

    productDetails.addToCart();
    // quantity should change again
    browser
      .wait(ExpectedConditions.elementToBeClickable(product2QuantitySpan), 3000)
      .then(function() {
        product2QuantitySpan.getText().then(function(text) {
          expect(text).toBe(
            '2',
            'Wrong product details add to cart button quantity'
          );
        });
        // close add to cart modal
        browser.wait(
          ExpectedConditions.visibilityOf(AddedToCartModal.getModal())
        );
        AddedToCartModal.closeModal();
      })
      .then(() => {
        const minicartIcon = home.header.getMinicartIconComponent();
        minicartIcon.click();
      });

    // wait for cart page to show up
    browser.wait(ExpectedConditions.urlContains('/cart'), 2000);
    // check if cart contains quantity 1 of 'Photosmart E317 Digital Camera'
    cart
      .findCartEntryByProductName('Photosmart E317 Digital Camera')
      .then(function(product1) {
        expect(product1.isDisplayed()).toBeTruthy();
        return product1;
      })
      .then(function(product1) {
        cart.getCartEntryQuantity(product1).then(function(quantity) {
          expect(parseInt(quantity, 10)).toBe(1, 'Wrong cart entry quantity');
        });
        cart.getCartEntryUnitPrice(product1).then(function(price) {
          expect(price).toBe('$114.12', 'Wrong cart entry unit price');
        });
        cart.getCartEntryTotalPrice(product1).then(function(price) {
          expect(price).toBe('$114.12', 'Wrong cart entry total price');
        });
      });
    // check if cart contains quantity 2 of 'PowerShot A480'
    cart
      .findCartEntryByProductName('PowerShot A480')
      .then(function(product2) {
        expect(product2.isDisplayed()).toBeTruthy();
        return product2;
      })
      .then(function(product2) {
        cart.getCartEntryQuantity(product2).then(function(quantity) {
          expect(parseInt(quantity, 10)).toBe(2, 'Wrong cart entry quantity');
        });
        cart.getCartEntryUnitPrice(product2).then(function(price) {
          expect(price).toBe('$99.85', 'Wrong cart entry unit price');
        });
        cart.getCartEntryTotalPrice(product2).then(function(price) {
          expect(price).toBe('$199.70', 'Wrong cart entry total price');
        });
      });
    // check cart totals
    cart.getSummarySubtotalValue().then(function(value) {
      // FIXME - ideally it should be $313.82, but right now it is the same value as in accelerator
      expect(value).toBe('$293.82', 'Wrong cart summary subtotal');
    });
    // FIXME - put back when sales tax is fixed
    // cart.getSummaryTaxValue().then(function(value) {
    //   expect(value).toBe('$13.99', 'Wrong cart summary sales tax');
    // });
    cart.getSummaryDiscountValue().then(function(value) {
      expect(value).toBe('$20.00', 'Wrong cart summary discount');
    });
    // FIXME - check delivery when available
    // cart.getSummaryDeliveryValue().then(function(value) {
    //   expect(value).toBe('$??', 'Wrong cart summary delivery estimation');
    // });
    cart.getSummaryTotalValue().then(function(value) {
      expect(value).toBe('$293.82', 'Wrong cart summary total');
    });
  });

  it('should be unable to add out of stock products to cart', () => {
    // go to homepage
    home.navigateTo();

    productDetails.navigateTo('358639');
    // wait until product details page is loaded
    browser.wait(
      ExpectedConditions.visibilityOf(productDetails.getPage()),
      2000
    );
    // there should be no add to cart button, and should be an 'Out of stock' message instead
    expect(productDetails.getAddToCartComponent().isPresent()).toBeFalsy();
    expect(productDetails.getOutOfStockDiv().isDisplayed()).toBeTruthy();
  });
});

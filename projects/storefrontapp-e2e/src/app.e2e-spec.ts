import { CartPage } from './pages/cart.po';
import { MinicartModal } from './cmslib/minicartModal.po';
import { E2ECommonTasks } from './commonTasks.po';
import { Register } from './pages/register.po';
import { E2EUtil } from './util.po';
import { LoginModal } from './cmslib/loginModal.po';
import {
  browser,
  by,
  ExpectedConditions,
  promise,
  element,
  until
} from 'protractor';
import { SearchResultsPage } from './pages/searchResults.po';
import { HomePage } from './pages/home.po';

describe('workspace-project App', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;
  let cart: CartPage;
  let timestamp: number;

  beforeEach(() => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
    cart = new CartPage();
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

  // FIXME - scaping test now while registration is not finished
  xit('should be able to register then login', () => {
    const username = timestamp + '@hybris.com';
    const password = '12341234';
    const firstName = 'First';
    const lastName = 'Last';
    E2ECommonTasks.register('Mr.', firstName, lastName, username, password);
    // TODO - check for confirmation message - by now, just waits a bit for registration to finish

    E2ECommonTasks.login(username, password);
    // wait for login modal to disappear
    browser.wait(
      ExpectedConditions.invisibilityOf(new LoginModal().getModal()),
      2000
    );

    const loginIconComponent = home.header.getLoginIconComponent();
    const loginButton = E2EUtil.getComponentWithinParent(
      loginIconComponent,
      'button'
    );
    const loginSpan = E2EUtil.getComponentWithinParentByCss(
      loginButton,
      'span'
    );
    // wait until default name disappears
    browser.wait(
      ExpectedConditions.not(
        ExpectedConditions.textToBePresentInElement(loginSpan, 'person')
      ),
      2000
    );
    // verify that user first and last name is show on login icon component
    loginSpan.getText().then(function(text) {
      expect(text).toContain(firstName + ' ' + lastName);
    });

    // logout: cleanup for next tests
    E2ECommonTasks.logout();
  });

  it('should be able to search', () => {
    // go to homepage
    home.navigateTo();
    // search for camera
    home.header.performSearch('camera');
    // should go to search results page
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 2000);
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

    // should show 10 results on page and top one be the Photosmart camera
    const results = searchResults.getProductListItems();
    results.then(function(items) {
      expect(items.length).toBe(10); // FIXME - lenght should be defined by config
      const h3 = items[0].element(by.tagName('h3'));
      h3.getText().then(function(text) {
        expect(text).toBe('Photosmart E317 Digital Camera');
      });
    });
  });

  it('should list with pagination', () => {
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
        expect(text).toBe('144 Products, Page: 1 of 15');
      });

    // go to next page
    // FIXME - commented out by now, as it is broken on spartacus
    // const nextButton = pagination.element(by.css('pagination-next'));
    // nextButton.click();
  });

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
        const quantitySpan = E2EUtil.getComponentWithinParentByCss(
          product1,
          'span[class="entry-quantity ng-star-inserted"]'
        );
        browser
          .wait(ExpectedConditions.visibilityOf(quantitySpan), 3000)
          .then(function() {
            quantitySpan.getText().then(function(text) {
              expect(text).toBe('1');
            });
          });
        // FIXME - check with minicart too (seems unable to get entry-quantity span)
      });

    // search for specific product, but do not press enter
    home.header.performSearch('1934793', true);
    const overlay = E2EUtil.getOverlayContainer();
    browser.wait(ExpectedConditions.visibilityOf(overlay), 2000);
    E2EUtil.getComponentWithinParentByCss(overlay, `div[role="listbox"]`);
    // FIXME - select first product in solr suggestions

    const minicartIcon = home.header.getMinicartIconComponent();
    minicartIcon.click();
    const minicartModal = new MinicartModal();
    minicartModal.goToCartPage();
    // FIXME - check minicart quantities

    // wait for cart page to show up
    browser.wait(ExpectedConditions.urlContains('/cart'), 2000);
    cart
      .findCartEntryByProductName('Photosmart E317 Digital Camera')
      .then(function(product1) {
        expect(product1.isDisplayed()).toBeTruthy();
        return product1;
      })
      .then(function(product1) {
        cart.getCartEntryQuantity(product1).then(function(quantity) {
          expect(parseInt(quantity, 10)).toBe(1);
        });
      });

    // FIXME - add logout step
  });
});

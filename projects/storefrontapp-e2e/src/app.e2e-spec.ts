import { browser, by, ExpectedConditions, promise } from 'protractor';
import { SearchResultsPage } from './pages/searchResults.po';
import { HomePage } from './pages/home.po';

describe('workspace-project App', () => {
  let home: HomePage;
  let searchResults: SearchResultsPage;

  beforeEach(() => {
    home = new HomePage();
    searchResults = new SearchResultsPage();
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
    const results = searchResults.getProductListItems();

    // FIXME - remove
    results.then(function(items) {
      expect(items.length).toBe(10);
      const h3 = items[0].element(by.tagName('h3'));
      console.log(h3.constructor.name);
      h3.getText().then(function(text) {
        console.log(text); // FIXME
      });
    });
  });
});

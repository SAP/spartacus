import {
  browser,
  element,
  by,
  protractor,
  ExpectedConditions
} from 'protractor';
import { HomePage } from './home.po';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should have site logo', () => {
    // go to homepage
    page.navigateTo();
    // check if site logo is present
    var siteLogoComponent = page.header.getSiteLogoComponent();
    expect<any>(siteLogoComponent.isPresent()).toEqual(true);
  });

  it('should be able to search', () => {
    // go to homepage
    page.navigateTo();
    // check if search box is present
    var searchComponent = page.header.getSearchComponent();

    // search for camera
    var searchInput = searchComponent.element(by.tagName('input'));
    searchInput.sendKeys('camera');
    browser
      .actions()
      .sendKeys(protractor.Key.ENTER)
      .perform();
    // should go to search page
    browser.wait(ExpectedConditions.urlContains('/search/camera'), 2000);
  });

  it('should have splash banner', () => {
    // go to homepage
    page.navigateTo();
    // check if site logo is present
    var splashBannerComponent = page.getSplahBanner();
    expect<any>(splashBannerComponent.isPresent()).toEqual(true);
  });
});

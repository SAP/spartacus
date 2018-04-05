import { browser, element, by, protractor } from 'protractor';
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

  it('should have search box', () => {
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

    browser.pause(); // FIXME
  });
});

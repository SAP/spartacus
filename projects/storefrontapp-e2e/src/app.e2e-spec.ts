import { browser, ExpectedConditions } from 'protractor';
import { HomePage } from './pages/home.po';

describe('workspace-project App', () => {
  let home: HomePage;

  beforeEach(() => {
    home = new HomePage();
  });

  it('should display title', () => {
    home.navigateTo();
    expect<any>(home.getTitle()).toEqual('Spaccelerator');
  });

  it('should have site logo', () => {
    // go to homepage
    home.navigateTo();
    // check if site logo is present
    const siteLogoComponent = home.header.getSiteLogoComponent();
    expect<any>(siteLogoComponent.isPresent()).toEqual(true);
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
    expect<any>(splashBannerComponent.isPresent()).toEqual(true);
  });
});

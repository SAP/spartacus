import { browser, ExpectedConditions, promise } from 'protractor';
import { HomePage } from './pages/home.po';

describe('workspace-project App', () => {
  let home: HomePage;

  beforeEach(() => {
    home = new HomePage();
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
});

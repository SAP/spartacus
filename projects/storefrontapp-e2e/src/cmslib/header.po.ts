import { browser, element, by, protractor } from 'protractor';
import { E2EUtil } from './../util.po';
export class Header {
  getSiteLogoComponent() {
    return E2EUtil.getComponentWithinDynamicSlot('SiteLogo', 'y-banner');
  }

  getSearchComponent() {
    return E2EUtil.getComponentWithinDynamicSlot('SearchBox', 'y-searchbox');
  }

  getLoginComponent() {
    return E2EUtil.getComponent('y-login');
  }

  performSearch(searchKey: string) {
    const searchComponent = this.getSearchComponent();

    // search for camera
    const searchInput = searchComponent.element(by.tagName('input'));
    searchInput.sendKeys(searchKey);
    browser
      .actions()
      .sendKeys(protractor.Key.ENTER)
      .perform();
  }
}

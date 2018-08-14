import { by, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class Header {
  getSiteLogoComponent(): ElementFinder {
    return E2EUtil.getComponentWithinDynamicSlot('SiteLogo', 'y-banner');
  }

  getSearchComponent(): ElementFinder {
    return E2EUtil.getComponentWithinDynamicSlot('SearchBox', 'y-searchbox');
  }

  getMinicartIconComponent(): ElementFinder {
    return E2EUtil.getComponent('y-mini-cart');
  }

  getLoginIconComponent(): ElementFinder {
    return E2EUtil.getComponent('y-login');
  }

  openLoginModal() {
    // click on login icon
    const loginIconButton = E2EUtil.getComponentWithinParent(
      this.getLoginIconComponent(),
      'button'
    );
    loginIconButton.click();
  }

  /**
   * Fills the search box to perform search
   * @param searchKey value to put on search box
   * @param skipEnter if true, will fill the search box but won't press enter (optional param)
   */
  performSearch(searchKey: string, skipEnter?: boolean) {
    const searchComponent = this.getSearchComponent();

    // search for camera
    const searchInput = searchComponent.element(
      by.css('input[placeholder="Search Box"]')
    );
    E2EUtil.fillInput(searchInput, searchKey, skipEnter);
  }
}

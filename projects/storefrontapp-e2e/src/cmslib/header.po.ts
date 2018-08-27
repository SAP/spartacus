import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class Header {
  readonly header: ElementFinder = element(by.tagName('y-header'));
  readonly miniCartButton: ElementFinder = this.header.element(
    by.tagName('y-mini-cart')
  );
  readonly loginComponent: ElementFinder = this.header.element(
    by.tagName('y-login')
  );
  readonly logoutButton: ElementFinder = element(
    by.cssContainingText('.cdk-overlay-container button', 'Logout')
  );
  readonly myAccountButton: ElementFinder = this.header.element(
    by.cssContainingText('a', 'My Account')
  );
  readonly orderHistoryButton: ElementFinder = element(
    by.cssContainingText('.cdk-overlay-container a', 'Order History')
  );

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

  async isLoggedIn(): Promise<boolean> {
    return !(await this.getLoginIconComponent()
      .element(by.cssContainingText('button mat-icon', 'person'))
      .isPresent());
  }
}

import { by, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class Header {
  readonly siteLogoComponent: ElementFinder = E2EUtil.getComponentWithinDynamicSlot(
    'SiteLogo',
    'y-banner'
  );
  readonly searchComponent: ElementFinder = E2EUtil.getComponentWithinDynamicSlot(
    'SearchBox',
    'y-searchbox'
  );
  readonly minicartIconComponent: ElementFinder = E2EUtil.getComponent(
    'y-mini-cart'
  );
  readonly loginIconComponent: ElementFinder = E2EUtil.getComponent('y-login');
  readonly loginIconButton: ElementFinder = this.loginIconComponent.element(
    by.tagName('button')
  );
  readonly searchInput: ElementFinder = this.searchComponent.element(
    by.css('input[placeholder="Search Box"]')
  );

  async openLoginModal() {
    // click on login icon
    await this.loginIconButton.click();
  }

  /**
   * Fills the search box to perform search
   * @param searchKey value to put on search box
   * @param skipEnter if true, will fill the search box but won't press enter (optional param)
   */
  async performSearch(searchKey: string, skipEnter?: boolean) {
    // search for camera
    await E2EUtil.fillInput(
      this.searchInput,
      searchKey,
      skipEnter
    );
  }
}

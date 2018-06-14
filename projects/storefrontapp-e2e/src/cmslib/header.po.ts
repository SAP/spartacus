import { LoginModal } from './loginModal.po';
import {
  browser,
  by,
  ExpectedConditions,
  ElementFinder,
  protractor
} from 'protractor';
import { E2EUtil } from './../util.po';
export class Header {
  getSiteLogoComponent(): ElementFinder {
    return E2EUtil.getComponentWithinDynamicSlot('SiteLogo', 'y-banner');
  }

  getSearchComponent(): ElementFinder {
    return E2EUtil.getComponentWithinDynamicSlot('SearchBox', 'y-searchbox');
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

  performSearch(searchKey: string) {
    const searchComponent = this.getSearchComponent();

    // search for camera
    const searchInput = searchComponent.element(
      by.css('input[placeholder="Search Box"]')
    );
    E2EUtil.fillInput(searchInput, searchKey);
  }
}

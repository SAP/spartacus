import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class Header {
  readonly header: ElementFinder = element(by.tagName('y-header'));
  readonly siteLogoComponent: ElementFinder = this.header.element(
    by.dynamicSlot('SiteLogo', 'y-banner')
  );
  readonly searchComponent: ElementFinder = this.header.element(
    by.dynamicSlot('SearchBox', 'y-searchbox')
  );
  readonly miniCartButton: ElementFinder = this.header.element(
    by.dynamicSlot('MiniCart', 'y-mini-cart')
  );
  readonly loginComponent: ElementFinder = this.header
    .all(by.tagName('y-login'))
    .first();
  readonly loginIconButton: ElementFinder = this.loginComponent.element(
    by.tagName('a')
  );
  readonly navigationMenu: ElementFinder = this.header.element(
    by.css('[id="My Account"].nav-link.dropdown-toggle')
  );
  readonly logoutButton: ElementFinder = element(
    by.cssContainingText('.y-navigation__child-item a', 'Sign Out')
  );
  readonly searchInput: ElementFinder = this.searchComponent.element(
    by.css('input.y-search-box__input')
  );
  readonly languageSwitcher: ElementFinder = this.header.element(
    by.css('#languageSelector')
  );
  readonly languageDe: ElementFinder = this.languageSwitcher.element(
    by.css('option[value="de"]')
  );
  readonly languageEn: ElementFinder = this.languageSwitcher.element(
    by.css('option[value="en"]')
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
    await E2EUtil.fillInput(this.searchInput, searchKey, skipEnter);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.loginComponent
      .element(by.css('.y-login-status__greet'))
      .isPresent();
  }
}

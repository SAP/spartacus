import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class Header {
  readonly header: ElementFinder = element(by.tagName('cx-header'));
  readonly siteLogoComponent: ElementFinder = this.header.element(
    by.dynamicSlot('SiteLogo', 'cx-banner')
  );
  readonly searchComponent: ElementFinder = this.header.element(
    by.dynamicSlot('SearchBox', 'cx-searchbox')
  );
  readonly miniCartButton: ElementFinder = this.header.element(
    by.dynamicSlot('MiniCart', 'cx-mini-cart')
  );
  readonly loginComponent: ElementFinder = this.header
    .all(by.tagName('cx-login'))
    .first();
  readonly loginIconButton: ElementFinder = this.loginComponent.element(
    by.tagName('a')
  );
  readonly navigationMenu: ElementFinder = this.header.element(
    by.css('[id="My Account"].nav-link.dropdown-toggle')
  );
  readonly logoutButton: ElementFinder = element(
    by.cssContainingText('.cx-navigation__child-item a', 'Sign Out')
  );
  readonly searchInput: ElementFinder = this.searchComponent.element(
    by.css('input.cx-search-box__input')
  );
  readonly currencySwitcher: ElementFinder = this.header
    .element(by.cssContainingText('label span', 'Currency'))
    .element(by.xpath('..'))
    .element(by.css('select'));

  readonly languageSwitcher: ElementFinder = this.header
    .element(by.cssContainingText('label span', 'Language'))
    .element(by.xpath('..'))
    .element(by.css('select'));
  currencyOption(currency: String): ElementFinder {
    return this.currencySwitcher.element(by.css(`option[value="${currency}"]`));
  }
  languageOption(lang: String): ElementFinder {
    return this.languageSwitcher.element(by.css(`option[value="${lang}"]`));
  }

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
      .element(by.css('.cx-login-status__greet'))
      .isPresent();
  }

  async selectCategory(categoryName: string) {
    await this.header
      .all(by.cssContainingText('.cx-navigation__link', categoryName))
      .first()
      .click();
  }

  async selectChildCategory(categoryName: string) {
    await this.header
      .all(by.cssContainingText('.cx-navigation__child-link', categoryName))
      .first()
      .click();
  }
}

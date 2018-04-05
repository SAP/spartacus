import { Footer } from './footer.po';
import { Header } from './header.po';
import { browser, element, by } from 'protractor';
import { E2EUtil } from './util.po';
export class HomePage {
  private _header: Header;
  private _footer: Footer;

  constructor() {
    this._header = new Header();
    this._footer = new Footer();
  }

  get header(): Header {
    return this._header;
  }

  get footer(): Footer {
    return this._footer;
  }

  navigateTo() {
    return browser.get('/');
  }

  getSplahBanner() {
    return E2EUtil.getComponent(
      'ElectronicsHompageSplashBanner',
      'y-responsive-banner'
    );
  }

  getDiscountBanner() {
    return E2EUtil.getComponent(
      'ElectronicsHompageDiscountBann',
      'y-responsive-banner'
    );
  }
}

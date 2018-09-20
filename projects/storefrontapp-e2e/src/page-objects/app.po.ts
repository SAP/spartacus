import { Header } from './cmslib/header.po';
import { browser } from 'protractor';
import { Footer } from './cmslib/footer.po';

export abstract class AppPage {
  readonly header: Header = new Header();
  readonly footer: Footer = new Footer();

  async getBrowserPageTitle(): Promise<string> {
    return browser.getTitle();
  }
}

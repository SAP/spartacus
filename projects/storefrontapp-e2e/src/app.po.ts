import { Header } from './cmslib/header.po';
import { browser } from 'protractor';
import {Footer} from './cmslib/footer.po';

export abstract class AppPage {
  readonly header = new Header();
  readonly footer = new Footer();

  async getBrowserPageTitle(): Promise<string> {
    return browser.getTitle();
  }
}

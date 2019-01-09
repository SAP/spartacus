import { AppPage } from './app.po';
import { browser, ElementFinder, by, element } from 'protractor';
import { E2EUtil } from '../e2e-util';

export class TermsAndConditionsPage extends AppPage {
  readonly YPAGE = 'cx-terms-conditions-page';
  readonly page: ElementFinder = element(by.tagName(this.YPAGE));

  async navigateTo() {
    await browser.get('/terms-and-conditions');
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }
}

import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class PaymentManagementPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('cx-payment-details-page'));

  readonly paymentHeader: ElementFinder = this.page.element(
    by.css('.cx-payment-methods__header h3')
  );

  readonly spinner: ElementFinder = this.page.element(by.css('cx-spinner'));

  async navigateTo() {
    await browser.get('/my-account/payment-details');
    await this.waitForReady();
  }

  async getCard(index) {
    const card = await this.page.all(by.css('cx-card')).get(index);
    const links = await card.all(by.css('.card-link'));
    const result = {
      card,
      selectDefaultLink: links.first(),
      deleteLink: links.last(),
      expiry: await card.all(by.css('.card__label')).last(),
      confirmDelete: await card.element(by.css('.btn-primary'))
    };
    return result;
  }

  async waitForReady() {
    await E2EUtil.wait4NotVisibleElement(this.spinner);
  }
}

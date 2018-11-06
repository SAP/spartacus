import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from './app.po';
import { E2EUtil } from '../e2e-util';
import { ProductDetailsPage } from './product-details.po';

export class CategoryDslrPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('cx-category-page-layout'));

  readonly productElement = (productNo: number): ElementFinder =>
    this.page.all(by.tagName('cx-responsive-banner')).get(productNo); // tslint:disable-line

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }

  async openProduct(productNo: number) {
    const el = this.productElement(productNo).element(by.tagName('img'));
    await E2EUtil.wait4VisibleElement(el);
    await browser
      .actions()
      .mouseMove(el)
      .perform();
    await el.click();
    return new ProductDetailsPage();
  }
}

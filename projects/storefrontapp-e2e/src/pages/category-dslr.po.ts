import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../util.po';
import { ProductDetailsPage } from './productDetails.po';

export class CategoryDslrPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('y-category-page-layout'));

  readonly productElement = (productNo: number): ElementFinder =>
    this.page.all(by.tagName('y-responsive-banner')).get(productNo); // tslint:disable-line

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }

  async openProduct(productNo: number) {
    const el = this.productElement(productNo);
    await E2EUtil.wait4VisibleElement(el);
    await el.click();
    return new ProductDetailsPage();
  }
}

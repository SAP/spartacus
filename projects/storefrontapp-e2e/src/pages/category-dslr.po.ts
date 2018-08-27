import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../util.po';
import { ProductDetailsPage } from './productDetails.po';

export class CategoryDslrPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('y-category-page-layout'));
  // prettier-ignore
  readonly productElement = (productNo: number): ElementFinder =>
    this.page.all(by.tagName('y-responsive-banner')).get(productNo)

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.productElement(0));
  }

  async openProduct(productNo: number) {
    await this.productElement(productNo).click();
    return new ProductDetailsPage();
  }
}

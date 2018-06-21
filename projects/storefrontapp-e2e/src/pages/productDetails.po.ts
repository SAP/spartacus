import { E2EUtil } from './../util.po';
import { browser, ElementFinder, ElementArrayFinder, by } from 'protractor';
import { AppPage } from '../app.po';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'y-product-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getAddToCartComponent(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-add-to-cart');
  }

  navigateTo(productId: string) {
    return browser.get('/product/' + productId);
  }

  addToCart() {
    const addButton = E2EUtil.getComponentWithinParent(
      this.getAddToCartComponent(),
      'button'
    ).click();
  }
}

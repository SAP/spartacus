import { E2EUtil } from './../util.po';
import { browser, ElementFinder, by, element } from 'protractor';
import { AppPage } from '../app.po';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'y-product-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly addToCartComponent: ElementFinder = this.page.element(
    by.tagName('y-add-to-cart')
  );
  readonly addToCartButton: ElementFinder = this.addToCartComponent.element(
    by.tagName('button')
  );

  getAddToCartComponent(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.page, 'y-add-to-cart');
  }

  getProductSummaryComponent(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.page, 'y-product-summary');
  }

  getOutOfStockDiv(): ElementFinder {
    return this.getProductSummaryComponent().element(
      by.cssContainingText('div', 'outOfStock')
    );
  }

  navigateTo(productId: string) {
    return browser.get('/product/' + productId);
  }

  async waitForReady() {
    // TODO: Some product details page probably doens't have addToCart button, so it's not a good check
    await E2EUtil.wait4VisibleElement(this.page);
  }

  addToCart() {
    return E2EUtil.getComponentWithinParent(
      this.getAddToCartComponent(),
      'button'
    ).click();
  }

  getProductQuantitySpan(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getAddToCartComponent(),
      'span[class="entry-quantity ng-star-inserted"]'
    );
  }
}

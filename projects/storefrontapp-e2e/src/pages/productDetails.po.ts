import { E2EUtil } from './../util.po';
import { browser, ElementFinder, by, element } from 'protractor';
import { AppPage } from '../app.po';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'y-product-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly productDetails: ElementFinder = this.page.element(
    by.tagName('y-product-details')
  );
  readonly productTitle: ElementFinder = this.productDetails.element(
    by.css('.product-title')
  );
  readonly productCode: ElementFinder = this.productDetails.element(
    by.css('.product-code')
  );

  readonly addToCartComponent: ElementFinder = this.page.element(
    by.tagName('y-add-to-cart')
  );
  readonly addToCartButton: ElementFinder = this.addToCartComponent.element(
    by.tagName('button')
  );
  readonly itemCounterComponent: ElementFinder = this.productDetails.element(
    by.tagName('y-item-counter')
  );
  readonly itemCounterUpButton: ElementFinder = this.itemCounterComponent
    .all(by.tagName('button'))
    .get(1);

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
    await E2EUtil.wait4PresentElement(this.productDetails);
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

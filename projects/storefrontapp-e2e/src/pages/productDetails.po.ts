import { E2EUtil } from './../util.po';
import { browser, ElementFinder, by } from 'protractor';
import { AppPage } from '../app.po';

export class ProductDetailsPage extends AppPage {
  readonly YPAGE = 'y-product-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getAddToCartComponent(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-add-to-cart');
  }

  getProductSummaryComponent(): ElementFinder {
    return E2EUtil.getComponentWithinParent(
      this.getPage(),
      'y-product-summary'
    );
  }

  getOutOfStockDiv(): ElementFinder {
    return this.getProductSummaryComponent().element(
      by.cssContainingText('div', 'outOfStock')
    );
  }

  navigateTo(productId: string) {
    return browser.get('/product/' + productId);
  }

  addToCart() {
    E2EUtil.getComponentWithinParent(
      this.getAddToCartComponent(),
      'button'
    ).click();
  }

  getProductQuantitySpan(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getAddToCartComponent(),
      'span[class="entry-quantity"]'
    );
  }
}

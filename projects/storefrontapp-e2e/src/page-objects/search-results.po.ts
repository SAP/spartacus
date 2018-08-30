import { AppPage } from './app.po';
import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  promise,
  element
} from 'protractor';
import { E2EUtil } from '../e2e-util';

export class SearchResultsPage extends AppPage {
  readonly YPAGE = 'y-category-page';

  readonly page: ElementFinder = E2EUtil.getComponent(this.YPAGE);
  readonly pagination: ElementFinder = E2EUtil.getComponentWithinParent(
    this.page,
    'y-product-paging'
  );
  readonly productListItems: ElementArrayFinder = this.page
    .element(by.tagName('y-product-list'))
    .all(by.tagName('y-product-list-item'));

  async navigateTo(searchKey: string) {
    await browser.get('/search/' + searchKey);
    await this.waitForReady();
  }

  async waitForReady() {
    return E2EUtil.wait4VisibleElement(this.page);
  }

  findProductByNameInResultsPage(productName: string): ElementFinder {
    return this.productListItems
      .filter(el =>
        el
          .element(by.tagName('h3'))
          .getText()
          .then(text => text === productName)
      )
      .first();
  }

  getAddToCartInProductListItem(product: ElementFinder): ElementFinder {
    return E2EUtil.getComponentWithinParent(product, 'y-add-to-cart');
  }

  async clickAddToCartButton4Product(product: ElementFinder) {
    const addToCartButton = this.getAddToCartInProductListItem(product);
    await addToCartButton
      .element(by.cssContainingText('button', 'Add to Cart'))
      .click();
  }

  getProductQuantitySpan(product: ElementFinder): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      product,
      'span[class="entry-quantity ng-star-inserted"]'
    );
  }
}

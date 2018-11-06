import { AppPage } from './app.po';
import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  element
} from 'protractor';
import { E2EUtil } from '../e2e-util';

export class SearchResultsPage extends AppPage {
  readonly YPAGE = 'cx-category-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly pagination: ElementFinder = this.page.element(
    by.tagName('cx-product-paging')
  );
  readonly productListItems: ElementArrayFinder = this.page
    .element(by.tagName('cx-product-list'))
    .all(by.tagName('cx-product-list-item'));
  readonly productByNameInResults = (productName: string): ElementFinder =>
    this.productListItems
      .filter(el =>
        el
          .element(by.css('a.cx-product-search-list__name'))
          .getText()
          .then(text => text === productName)
      )
      .first();

  async navigateTo(searchKey: string) {
    await browser.get('/search/' + searchKey);
    await this.waitForReady();
  }

  async waitForReady() {
    return E2EUtil.wait4VisibleElement(this.page);
  }

  getAddToCartInProductListItem(product: ElementFinder): ElementFinder {
    return product.element(by.tagName('cx-add-to-cart'));
  }

  async clickAddToCartButton4Product(product: ElementFinder) {
    const addToCartButton = this.getAddToCartInProductListItem(product);
    await addToCartButton.click();
  }

  getProductQuantitySpan(product: ElementFinder): ElementFinder {
    return product.element(
      by.css('span[class="entry-quantity ng-star-inserted"]')
    );
  }

  getHeaderText() {
    return this.page.element(by.css('header h1')).getText();
  }
}

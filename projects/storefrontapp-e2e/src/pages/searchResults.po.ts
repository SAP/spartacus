import { AppPage } from './../app.po';
import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  promise
} from 'protractor';
import { E2EUtil } from './../util.po';
export class SearchResultsPage extends AppPage {
  readonly YPAGE = 'y-category-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getPagination(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-product-paging');
  }

  getProductListItems(): ElementArrayFinder {
    const producList = E2EUtil.getComponentWithinParent(
      this.getPage(),
      'y-product-list'
    );
    return E2EUtil.getComponentsWithinParent(producList, 'y-product-list-item');
  }

  navigateTo(searchKey: string): promise.Promise<any> {
    return browser.get('/search/' + searchKey);
  }

  findProductByNameInResultsPage(
    productName: string
  ): promise.Promise<ElementFinder> {
    const results = this.getProductListItems();
    let match: ElementFinder = null;
    return results
      .then(items => {
        for (const item of items) {
          const h3: ElementFinder = item.element(by.tagName('h3'));
          h3.getText().then(text => {
            // if found text, return the 'y-product-list-item' element
            if (text === productName) {
              match = item;
            }
          });
        }
      })
      .then(
        (): ElementFinder => {
          return match;
        }
      );
  }

  getAddToCartInProductListItem(product: ElementFinder): ElementFinder {
    return E2EUtil.getComponentWithinParent(product, 'y-add-to-cart');
  }

  clickAddToCartButton4Product(product: ElementFinder) {
    const addToCartButton = this.getAddToCartInProductListItem(product);
    addToCartButton
      .element(by.cssContainingText('button', 'Add to Cart'))
      .click();
  }

  getProductQuantitySpan(product: ElementFinder): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      product,
      'span[class="entry-quantity"]'
    );
  }
}

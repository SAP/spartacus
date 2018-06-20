import { AppPage } from './../app.po';
import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  element
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

  findProductByNameInResultsPage(productName: string) {
    const results = this.getProductListItems();
    let match: ElementFinder = null;
    return results
      .then(function(items) {
        for (const item of items) {
          const h3: ElementFinder = item.element(by.tagName('h3'));
          h3.getText().then(function(text) {
            // if found text, return the 'y-product-list-item' element
            if (text === productName) {
              match = item;
            }
          });
        }
      })
      .then(function(): ElementFinder {
        return match;
      });
  }

  getAddToCartInProductListItem(product1: ElementFinder): ElementFinder {
    return E2EUtil.getComponentWithinParent(product1, 'y-add-to-cart');
  }

  navigateTo(searchKey: string) {
    return browser.get('/search/' + searchKey);
  }
}

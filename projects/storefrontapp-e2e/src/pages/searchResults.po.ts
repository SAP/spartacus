import { AppPage } from './../app.po';
import { browser, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class SearchResultsPage extends AppPage {
  readonly YPAGE = 'y-category-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getPagination() {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-product-paging');
  }

  getProductListItems() {
    return E2EUtil.getComponentsWithinParent(
      'y-product-list',
      'y-product-list-item'
    );
  }

  findProductByDescriptionInPage(productDescription: string) {
    // FIXME - implement
  }

  navigateTo(searchKey: string) {
    return browser.get('/search/' + searchKey);
  }
}

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
    const producList = E2EUtil.getComponentWithinParent(
      this.getPage(),
      'y-product-list'
    );
    return E2EUtil.getComponentsWithinParent(producList, 'y-product-list-item');
  }

  findProductByDescriptionInPage(productDescription: string) {
    // FIXME - implement
  }

  navigateTo(searchKey: string) {
    return browser.get('/search/' + searchKey);
  }
}

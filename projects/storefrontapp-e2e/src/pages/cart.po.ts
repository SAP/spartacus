import { E2EUtil } from './../util.po';
import { browser, ElementFinder, ElementArrayFinder, by } from 'protractor';
import { AppPage } from '../app.po';

export class CartPage extends AppPage {
  readonly YPAGE = 'y-cart-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  navigateTo() {
    return browser.get('/cart');
  }

  getCartEntries(): ElementArrayFinder {
    return E2EUtil.getComponentsWithinParent(this.getPage(), 'y-cart-item');
  }

  findCartEntryByProductName(productName: string) {
    const results = this.getCartEntries();
    let match: ElementFinder = null;
    return results
      .then(function(items) {
        for (const item of items) {
          const itemInfoDiv = E2EUtil.getComponentWithinParentByClass(
            item,
            'item__info'
          );
          const span = itemInfoDiv.element(by.tagName('span'));
          span.getText().then(function(text) {
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

  getCartEntryQuantity(cartEntry: ElementFinder) {
    const itemQuantityDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__quantity'
    );
    const paragraph = E2EUtil.getComponentsWithinParent(itemQuantityDiv, 'p');
    return paragraph.getText();
  }
}

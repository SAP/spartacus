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

  getOrderSummary(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-order-summary');
  }

  findCartEntryByProductName(productName: string) {
    const results = this.getCartEntries();
    let match: ElementFinder = null;
    return results
      .then(items => {
        for (const item of items) {
          const itemInfoDiv = E2EUtil.getComponentWithinParentByClass(
            item,
            'item__info'
          );
          const span = E2EUtil.getComponentWithinParentByClass(
            itemInfoDiv,
            'item__name'
          );
          span.getText().then(text => {
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

  getCartEntryUnitPrice(cartEntry: ElementFinder) {
    const unitPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__price'
    );
    return unitPriceDiv.getText().then(text => {
      return text.slice(text.indexOf('$'));
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

  getCartEntryTotalPrice(cartEntry: ElementFinder) {
    const totalPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__total'
    );
    return totalPriceDiv.getText().then(text => {
      return text.slice(text.indexOf('$'));
    });
  }

  getOrderSummaryInnerDivValue(textTitle: string) {
    const outerDiv = E2EUtil.getComponentWithinParentByCss(
      this.getOrderSummary(),
      'div[class="order-summary"]'
    );
    const mainDiv = E2EUtil.getComponentsWithinParent(outerDiv, 'div').first();
    const valueDiv = mainDiv.element(by.cssContainingText('div', textTitle));

    return valueDiv.getText().then(text => {
      return text.slice(text.indexOf('$'));
    });
  }

  getSummarySubtotalValue() {
    return this.getOrderSummaryInnerDivValue('Subtotal:');
  }

  getSummaryTaxValue() {
    return this.getOrderSummaryInnerDivValue('Sales Tax:');
  }

  getSummaryDiscountValue() {
    return this.getOrderSummaryInnerDivValue('Discount:');
  }

  // FIXME - implement when element is available on page
  // getSummaryDeliveryValue() {
  //   // not available
  // }

  getSummaryTotalValue() {
    return this.getOrderSummaryInnerDivValue('Total:');
  }
}

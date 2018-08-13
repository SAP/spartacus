import { E2EUtil } from './../util.po';
import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  promise
} from 'protractor';
import { AppPage } from '../app.po';

export class CartPage extends AppPage {
  readonly YPAGE = 'y-cart-page';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  navigateTo(): promise.Promise<any> {
    return browser.get('/cart');
  }

  getCartEntries(): ElementArrayFinder {
    return E2EUtil.getComponentsWithinParent(this.getPage(), 'y-cart-item');
  }

  getOrderSummary(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'y-order-summary');
  }

  findCartEntryByProductName(
    productName: string
  ): promise.Promise<ElementFinder> {
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

  getCartEntryUnitPrice(cartEntry: ElementFinder): promise.Promise<string> {
    const unitPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__price'
    );
    return unitPriceDiv.getText().then(text => {
      return text.slice(text.indexOf('$'));
    });
  }

  getCartEntryQuantity(cartEntry: ElementFinder): promise.Promise<string> {
    const itemQuantityDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__quantity'
    );
    const paragraph = E2EUtil.getComponentsWithinParent(itemQuantityDiv, 'p');
    return paragraph.getText();
  }

  getCartEntryTotalPrice(cartEntry: ElementFinder): promise.Promise<string> {
    const totalPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__total'
    );
    return totalPriceDiv.getText().then(text => {
      return text.slice(text.indexOf('$'));
    });
  }

  checkCartEntry(
    productName: string,
    quantity: string,
    unitPrice: string,
    totalPrice: string
  ) {
    this.findCartEntryByProductName(productName)
      .then(product => {
        expect(product.isDisplayed()).toBeTruthy();
        return product;
      })
      .then(product => {
        this.getCartEntryQuantity(product).then(qty => {
          expect(parseInt(qty, 10)).toBe(quantity, 'Wrong cart entry quantity');
        });
        this.getCartEntryUnitPrice(product).then(price => {
          expect(price).toBe(unitPrice, 'Wrong cart entry unit price');
        });
        this.getCartEntryTotalPrice(product).then(price => {
          expect(price).toBe(totalPrice, 'Wrong cart entry total price');
        });
      });
  }

  getOrderSummaryInnerDivValue(textTitle: string): promise.Promise<string> {
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

  getSummarySubtotalValue(): promise.Promise<string> {
    return this.getOrderSummaryInnerDivValue('Subtotal:');
  }

  getSummaryTaxValue(): promise.Promise<string> {
    return this.getOrderSummaryInnerDivValue('Sales Tax:');
  }

  getSummaryDiscountValue(): promise.Promise<string> {
    return this.getOrderSummaryInnerDivValue('Discount:');
  }

  // FIXME - implement when element is available on page
  // getSummaryDeliveryValue() {
  //   // not available
  // }

  getSummaryTotalValue(): promise.Promise<string> {
    return this.getOrderSummaryInnerDivValue('Total:');
  }

  checkCartSummary(subtotal: string, discount: string, total: string) {
    // check cart totals
    this.getSummarySubtotalValue().then(value => {
      // FIXME - ideally it should be $313.82, but right now it is the same value as in accelerator
      expect(value).toBe(subtotal, 'Wrong cart summary subtotal');
    });
    // FIXME - put back when sales tax is fixed
    // this.getSummaryTaxValue().then((value) => {
    //   expect(value).toBe('$??', 'Wrong cart summary sales tax');
    // });
    this.getSummaryDiscountValue().then(value => {
      expect(value).toBe(discount, 'Wrong cart summary discount');
    });
    // FIXME - check delivery when available
    // this.getSummaryDeliveryValue().then((value) => {
    //   expect(value).toBe('$??', 'Wrong cart summary delivery estimation');
    // });
    this.getSummaryTotalValue().then(value => {
      expect(value).toBe(total, 'Wrong cart summary total');
    });
  }
}

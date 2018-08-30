import {
  browser,
  ElementFinder,
  ElementArrayFinder,
  by,
  element
} from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class CartPage extends AppPage {
  readonly YPAGE = 'y-cart-page';
  readonly page = element(by.tagName(this.YPAGE));
  readonly cartEntries: ElementArrayFinder = this.page.all(
    by.tagName('y-cart-item')
  );
  readonly orderSummary: ElementFinder = this.page.element(
    by.tagName('y-order-summary')
  );

  async navigateTo() {
    await browser.get('/cart');
  }

  findCartEntryByProductName(productName: string): ElementFinder {
    return this.cartEntries
      .filter(el =>
        el
          .element(by.css('.item__info .item__name'))
          .getText()
          .then(text => text === productName)
      )
      .first();
  }

  async getCartEntryUnitPrice(cartEntry: ElementFinder): Promise<string> {
    const unitPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__price'
    );
    return E2EUtil.findPrice(await unitPriceDiv.getText());
  }

  async getCartEntryQuantity(cartEntry: ElementFinder): Promise<string> {
    const itemQuantityDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__quantity'
    );
    const input = E2EUtil.getComponentsWithinParent(itemQuantityDiv, 'input');
    return input.getAttribute('value');
  }

  async getCartEntryTotalPrice(cartEntry: ElementFinder): Promise<string> {
    const totalPriceDiv = E2EUtil.getComponentWithinParentByClass(
      cartEntry,
      'item__total'
    );
    return E2EUtil.findPrice(await totalPriceDiv.getText());
  }

  async checkCartEntry(
    productName: string,
    quantity: string | number,
    unitPrice: string,
    totalPrice: string
  ) {
    const product = this.findCartEntryByProductName(productName);
    expect(await product.isDisplayed()).toBeTruthy();

    expect(parseInt(await this.getCartEntryQuantity(product), 10)).toBe(
      quantity,
      'Wrong cart entry quantity'
    );

    const price = await this.getCartEntryUnitPrice(product);
    expect(price).toBe(unitPrice, 'Wrong cart entry unit price');

    const price2 = await this.getCartEntryTotalPrice(product);
    expect(price2).toBe(totalPrice, 'Wrong cart entry total price');
  }

  async getOrderSummaryInnerDivValue(textTitle: string): Promise<string> {
    const outerDiv = E2EUtil.getComponentWithinParentByCss(
      this.orderSummary,
      'div[class="order-summary"]'
    );
    const mainDiv = E2EUtil.getComponentsWithinParent(outerDiv, 'div').first();
    const valueDiv = mainDiv.element(by.cssContainingText('div', textTitle));

    return E2EUtil.findPrice(await valueDiv.getText());
  }

  async getSummarySubtotalValue(): Promise<string> {
    return this.getOrderSummaryInnerDivValue('Subtotal:');
  }

  async getSummaryTaxValue(): Promise<string> {
    return this.getOrderSummaryInnerDivValue('Sales Tax:');
  }

  async getSummaryDiscountValue(): Promise<string> {
    return this.getOrderSummaryInnerDivValue('Discount:');
  }

  // FIXME - implement when element is available on page
  // getSummaryDeliveryValue() {
  //   // not available
  // }

  async getSummaryTotalValue(): Promise<string> {
    return this.getOrderSummaryInnerDivValue('Total:');
  }

  async checkCartSummary(subtotal: string, discount: string, total: string) {
    // check cart totals

    // FIXME - ideally it should be $313.82, but right now it is the same value as in accelerator
    expect(await this.getSummarySubtotalValue()).toBe(
      subtotal,
      'Wrong cart summary subtotal'
    );

    // FIXME - put back when sales tax is fixed
    // this.getSummaryTaxValue().then((value) => {
    //   expect(value).toBe('$??', 'Wrong cart summary sales tax');
    // });

    expect(await this.getSummaryDiscountValue()).toBe(
      discount,
      'Wrong cart summary discount'
    );

    // FIXME - check delivery when available
    // this.getSummaryDeliveryValue().then((value) => {
    //   expect(value).toBe('$??', 'Wrong cart summary delivery estimation');
    // });

    expect(await this.getSummaryTotalValue()).toBe(
      total,
      'Wrong cart summary total'
    );
  }
}

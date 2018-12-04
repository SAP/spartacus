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
  readonly YPAGE = 'cx-cart-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly cartEntries: ElementArrayFinder = this.page.all(
    by.tagName('cx-cart-item')
  );
  readonly orderSummary: ElementFinder = this.page.element(
    by.tagName('cx-order-summary')
  );
  readonly orderSummaryAmount: ElementFinder = this.page.element(
    by.css('.cx-order-summary__total-final .cx-order-summary__amount')
  );

  readonly itemCounterComponent: ElementArrayFinder = this.page.all(
    by.tagName('cx-item-counter')
  );

  readonly cartEntryByProductName = (productName: string): ElementFinder =>
    this.cartEntries
      .filter(el =>
        el
          .element(by.css('.cx-cart-item__name'))
          .getText()
          .then(text => text === productName)
      )
      .first();

  async increaseQuantity(index: number = 0) {
    return await this.itemCounterComponent
      .get(index)
      .all(by.tagName('button'))
      .get(1)
      .click();
  }
  async navigateTo() {
    await browser.get('/cart');
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.page);
  }

  async getCartEntryUnitPrice(cartEntry: ElementFinder): Promise<string> {
    const unitPriceDiv = cartEntry.element(
      by.css('.cx-cart-item__price--value')
    );
    return E2EUtil.findPrice(await unitPriceDiv.getText());
  }

  async getCartEntryQuantity(cartEntry: ElementFinder): Promise<string> {
    const input = cartEntry.element(by.css('.cx-item-counter__value'));
    return await input.getAttribute('value');
  }

  async getCartEntryTotalPrice(cartEntry: ElementFinder): Promise<string> {
    const totalPriceDiv = cartEntry.element(
      by.css('.cx-cart-item__total--value')
    );
    return E2EUtil.findPrice(await totalPriceDiv.getText());
  }

  async deleteEntryByName(productName) {
    const product = this.cartEntryByProductName(productName);
    await product.element(by.css('.cx-cart-item__actions a')).click();
  }

  async checkCartEntry(
    productName: string,
    quantity: string | number,
    unitPrice: string,
    totalPrice: string
  ) {
    const product = this.cartEntryByProductName(productName);
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
    const outerDiv = this.orderSummary.element(
      by.css('div[class="order-summary"]')
    );
    const mainDiv = outerDiv.all(by.tagName('div')).first();
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

  async getSummaryTotalValue(): Promise<string> {
    return await this.page
      .element(by.css('.cx-order-summary__amount'))
      .getText();
  }

  async checkCartSummary(subtotal: string, discount: string, total: string) {
    // FIXME - ideally it should be $313.82, but right now it is the same value as
    // in accelerator
    expect(await this.getSummarySubtotalValue()).toBe(
      subtotal,
      'Wrong cart summary subtotal'
    );

    expect(await this.getSummaryDiscountValue()).toBe(
      discount,
      'Wrong cart summary discount'
    );

    expect(await this.getSummaryTotalValue()).toBe(
      total,
      'Wrong cart summary total'
    );
  }
}

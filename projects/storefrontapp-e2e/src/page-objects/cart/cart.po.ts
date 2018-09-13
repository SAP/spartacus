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

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly cartEntries: ElementArrayFinder = this.page.all(
    by.tagName('y-cart-item')
  );
  readonly orderSummary: ElementFinder = this.page.element(
    by.tagName('y-order-summary')
  );
  readonly cartEntryByProductName = (productName: string): ElementFinder =>
    this.cartEntries
      .filter(el =>
        el
          .element(by.css('.item__info .item__name'))
          .getText()
          .then(text => text === productName)
      )
      .first();

  async navigateTo() {
    await browser.get('/cart');
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.page);
  }

  async getCartEntryUnitPrice(cartEntry: ElementFinder): Promise<string> {
    const unitPriceDiv = cartEntry.element(by.css('.item__price'));
    return E2EUtil.findPrice(await unitPriceDiv.getText());
  }

  async getCartEntryQuantity(cartEntry: ElementFinder): Promise<string> {
    const input = cartEntry.element(by.css('.y-item-counter__value'));
    return await input.getText();
  }

  async getCartEntryTotalPrice(cartEntry: ElementFinder): Promise<string> {
    const totalPriceDiv = cartEntry.element(by.css('.item__total'));
    return E2EUtil.findPrice(await totalPriceDiv.getText());
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
    return this.getOrderSummaryInnerDivValue('Total:');
  }

  async checkCartSummary(subtotal: string, discount: string, total: string) {
    // FIXME - ideally it should be $313.82, but right now it is the same value as in accelerator
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

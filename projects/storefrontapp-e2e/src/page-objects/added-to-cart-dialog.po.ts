import { browser, ElementFinder, by, element } from 'protractor';
import { AppPage } from './app.po';
import { E2EUtil } from '../e2e-util';

export class AddedToCartDialog extends AppPage {
  readonly dialog: ElementFinder = element(
    by.tagName('y-added-to-cart-dialog')
  );
  readonly dialogTitle: ElementFinder = this.dialog.element(
    by.css('.y-added-to-cart-dialog__title')
  );
  readonly loader: ElementFinder = this.dialog.element(by.tagName('y-spinner'));
  readonly closeButton: ElementFinder = this.dialog.element(
    by.css('[aria-label="Close"]')
  );
  readonly itemContainer: ElementFinder = this.dialog.element(
    by.css('.y-added-to-cart-dialog__item-container')
  );
  readonly actionButtons: ElementFinder = this.dialog.element(
    by.css('.y-added-to-cart-dialog__actions')
  );
  readonly viewCartButton: ElementFinder = this.actionButtons.element(
    by.css('.btn-primary')
  );
  readonly goToCheckoutButton: ElementFinder = this.actionButtons.element(
    by.css('.btn-secondary')
  );
  readonly total: ElementFinder = this.dialog.element(
    by.css('.y-added-to-cart-dialog__total')
  );
  readonly totalCount: ElementFinder = this.total.element(
    by.css('div:first-of-type')
  );
  readonly totalPrice: ElementFinder = this.total.element(
    by.css('div:last-of-type')
  );
  readonly item: ElementFinder = this.itemContainer.element(
    by.tagName('y-cart-item')
  );
  readonly itemName: ElementFinder = this.item.element(
    by.css('.y-cart-item__name--link')
  );
  readonly itemPrice: ElementFinder = this.item.element(
    by.css('.y-cart-item__price--value')
  );
  readonly itemQuantity: ElementFinder = this.item.element(
    by.css('.y-cart-item__quantity--value')
  );
  readonly itemTotalPrice: ElementFinder = this.item.element(
    by.css('.y-cart-item__total--value')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.dialog);
    await E2EUtil.wait4NotVisibleElement(this.loader);
  }
}

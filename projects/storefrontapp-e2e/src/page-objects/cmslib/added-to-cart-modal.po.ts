import { ElementFinder, by, element } from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class AddedToCartModal extends AppPage {
  readonly modal: ElementFinder = element(
    by.tagName('cx-added-to-cart-dialog')
  );
  readonly modalTitle: ElementFinder = this.modal.element(
    by.css('.cx-added-to-cart-dialog__title')
  );
  readonly loader: ElementFinder = this.modal.element(by.tagName('cx-spinner'));
  readonly closeButton: ElementFinder = this.modal.element(
    by.css('[aria-label="Close"]')
  );
  readonly itemContainer: ElementFinder = this.modal.element(
    by.css('.cx-added-to-cart-dialog__item-container')
  );
  readonly actionButtons: ElementFinder = this.modal.element(
    by.css('.cx-added-to-cart-dialog__actions')
  );
  readonly viewCartButton: ElementFinder = this.actionButtons.element(
    by.css('.btn-primary')
  );
  readonly goToCheckoutButton: ElementFinder = this.actionButtons.element(
    by.css('.btn-secondary')
  );
  readonly total: ElementFinder = this.modal.element(
    by.css('.cx-added-to-cart-dialog__total')
  );
  readonly totalCount: ElementFinder = this.total.element(
    by.css('div:first-of-type')
  );
  readonly totalPrice: ElementFinder = this.total.element(
    by.css('div:last-of-type')
  );
  readonly item: ElementFinder = this.itemContainer.element(
    by.tagName('cx-cart-item')
  );
  readonly itemName: ElementFinder = this.item.element(by.css('.cx-link'));
  readonly itemPrice: ElementFinder = this.item.element(
    by.css('.cx-price .cx-value')
  );
  readonly itemQuantity: ElementFinder = this.item.element(
    by.css('.cx-quantity .cx-value')
  );
  readonly itemTotalPrice: ElementFinder = this.item.element(
    by.css('.cx-total .cx-value')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.modal);
    await E2EUtil.wait4NotVisibleElement(this.loader);
  }
}

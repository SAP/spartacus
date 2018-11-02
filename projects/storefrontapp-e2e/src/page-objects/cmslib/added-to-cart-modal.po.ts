import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';
export class AddedToCartModal {
  readonly YMODAL = 'cx-added-to-cart-dialog';

  modal: ElementFinder = element(by.tagName(this.YMODAL));
  closeButton: ElementFinder = this.modal.element(
    by.css('.cx-added-to-cart-dialog__header button.close')
  );
  readonly proceedToCheckoutButton: ElementFinder = this.modal.element(
    by.css('a[routerLink="/checkout"]')
  );
  readonly cartItem = (itemNo: number): ElementFinder =>
    this.modal.all(by.tagName('cx-cart-item')).get(itemNo); // tslint:disable-line

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.modal);
  }

  async closeModal() {
    await this.closeButton.click();
  }

  /**
   * Check if modal is displayed, close it, then wait until not visible.
   */
  async closeModalWait() {
    if (await this.modal.isDisplayed()) {
      await this.closeModal();
      await E2EUtil.wait4NotVisibleElement(this.modal);
    }
  }
}

import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';
export class AddedToCartModal {
  readonly YMODAL = 'y-added-to-cart-dialog';

  modal: ElementFinder = element(by.tagName(this.YMODAL));
  closeButton: ElementFinder = this.modal.element(
    by.css('.mat-dialog-close-btn')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.modal);
  }

  async closeModal() {
    await this.closeButton.click();
  }

  /**
   * Check if modal is displayed, close it, then wait until not visible.
   */
  async closeModalWait(): Promise<void> {
    if (await this.modal.isDisplayed()) {
      await this.closeModal();
      await E2EUtil.wait4NotVisibleElement(this.modal);
    }
  }
}

import { E2EUtil } from './../util.po';
import { by, element, ElementFinder } from 'protractor';
export class AddedToCartModal {
  readonly YMODAL = 'y-added-to-cart-dialog';

  readonly modal: ElementFinder = element(by.tagName(this.YMODAL));
  readonly proceedToCheckoutButton: ElementFinder = this.modal.element(
    by.css('button[routerLink="/checkout"]')
  );

  readonly cartItem = (itemNo: number): ElementFinder =>
    this.modal.all(by.tagName('y-cart-item')).get(itemNo); // tslint:disable-line

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.modal);
  }

  getModal(): ElementFinder {
    return E2EUtil.getComponent(this.YMODAL);
  }

  closeModal() {
    const closeButton: ElementFinder = E2EUtil.getComponentWithinParentByClass(
      this.getModal(),
      'mat-dialog-close-btn'
    );
    closeButton.click();
  }

  /**
   * Check if modal is displayed, close it, then wait until not visible.
   */
  closeModalWait(): Promise<void> {
    const modal = this.getModal();
    return expect(modal.isDisplayed())
      .toBeTruthy()
      .then(() => {
        E2EUtil.wait4VisibleElement(modal)
          .then(() => {
            this.closeModal();
          })
          .then(() => {
            E2EUtil.wait4NotVisibleElement(modal);
          });
      });
  }
}

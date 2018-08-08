import { E2EUtil } from './../util.po';
import { ElementFinder } from 'protractor';
export class AddedToCartModal {
  readonly YMODAL = 'y-added-to-cart-dialog';

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

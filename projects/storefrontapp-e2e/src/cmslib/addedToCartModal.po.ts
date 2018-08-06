import { E2EUtil } from './../util.po';
import { by, ElementFinder } from 'protractor';
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
}

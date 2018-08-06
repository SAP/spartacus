import { E2EUtil } from './../util.po';
import { by, ElementFinder } from 'protractor';
export class AddedToCartModal {
  static readonly YMODAL = 'y-added-to-cart-dialog';

  static getModal(): ElementFinder {
    return E2EUtil.getComponent(AddedToCartModal.YMODAL);
  }

  static closeModal() {
    const closeButton: ElementFinder = E2EUtil.getComponentWithinParentByClass(
      AddedToCartModal.getModal(),
      'mat-dialog-close-btn'
    );
    closeButton.click();
  }
}

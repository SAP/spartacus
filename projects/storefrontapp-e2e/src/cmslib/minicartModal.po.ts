import { E2EUtil } from './../util.po';
import { by, ElementFinder } from 'protractor';
export class MinicartModal {
  readonly YMODAL = 'y-cart-dialog';

  getModal(): ElementFinder {
    return E2EUtil.getComponent(this.YMODAL);
  }

  goToCartPage() {
    const actionsDiv = E2EUtil.getComponentWithinParentByClass(
      this.getModal(),
      'mat-dialog-actions'
    );

    actionsDiv.element(by.buttonText('Checkout')).click();
  }
}

import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../util.po';

export class DeliveryModeForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-delivery-mode-form')
  );
  readonly deliveryModeSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="deliveryModeId"]')
  );
  readonly nextButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Next')
  );

  async setDeliveryMethod(option: number = 1) {
    await this.deliveryModeSelect
      .all(by.tagName('option'))
      .get(option)
      .click();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }
}

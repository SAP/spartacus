import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../util.po';

export class DeliveryModeForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-delivery-mode')
  );
  readonly header: ElementFinder = this.form.element(by.css('h3.heading'));
  readonly address: ElementFinder = this.form.element(by.css('.address'));
  readonly deliveryModeSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="deliveryModeId"]')
  );
  readonly nextButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Next')
  );

  async setDeliveryMethod(option: number = 1) {
    await E2EUtil.selectOptionByNo(this.deliveryModeSelect, option);
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.form);
  }
}

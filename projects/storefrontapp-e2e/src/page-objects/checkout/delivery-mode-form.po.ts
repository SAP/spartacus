import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class DeliveryModeForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('cx-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('cx-delivery-mode')
  );
  readonly header: ElementFinder = this.form.element(
    by.css('h3.cx-delivery-mode-form__title')
  );
  readonly address: ElementFinder = this.form.element(by.css('.address'));
  readonly deliveryModeSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="deliveryModeId"]')
  );
  readonly nextButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Continue')
  );

  async setDeliveryMethod() {
    await this.deliveryModeSelect.click();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }
}

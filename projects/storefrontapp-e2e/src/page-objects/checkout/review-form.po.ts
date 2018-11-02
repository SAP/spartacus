import { by, element, ElementFinder } from 'protractor';

import { E2EUtil } from '../../e2e-util';

export class ReviewForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('cx-root'))
  ) {}
  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('cx-review-submit')
  );
  readonly header: ElementFinder = this.form.element(
    by.css('h3.y-review__title')
  );
  readonly shippingAddress: ElementFinder = this.form.element(
    by.css('.y-review__summary-card__address')
  );
  readonly shippingMethod: ElementFinder = this.form.element(
    by.css('.y-review__summary-card__shipping-method')
  );
  readonly paymentMethod: ElementFinder = this.form.element(
    by.css('.y-review__summary-card__payment-method')
  );
  readonly billingAddress: ElementFinder = this.form.element(
    by.css('.y-review__summary-card__address')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }
}

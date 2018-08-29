import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../../app.po';
import { E2EUtil } from '../../util.po';

export class OrderConfirmationPage extends AppPage {
  readonly page: ElementFinder = element(
    by.tagName('y-order-confirmation-page')
  );
  readonly confirmationComponent: ElementFinder = this.page.element(
    by.tagName('y-order-confirmation')
  );
  readonly confirmationHeader: ElementFinder = this.confirmationComponent.element(
    by.css('.order-confirmation-header h2')
  );
  readonly confimationMessage: ElementFinder = this.confirmationComponent.element(
    by.css('.header-msg')
  );

  readonly shippingAddress: ElementFinder = this.confirmationComponent
    .all(by.css('.user-checkout-info'))
    .get(0);
  readonly shippingMethod: ElementFinder = this.confirmationComponent
    .all(by.css('.user-checkout-info'))
    .get(3);
  readonly paymentMethod: ElementFinder = this.confirmationComponent
    .all(by.css('.user-checkout-info'))
    .get(2);
  readonly billingAddress: ElementFinder = this.confirmationComponent
    .all(by.css('.user-checkout-info'))
    .get(1);
  readonly orderSummary: ElementFinder = this.page.element(
    by.tagName('y-order-summary')
  );

  readonly orderItem = (itemNo: number): ElementFinder =>
    this.page
      .all(
        by.css('.order-items-container table.order-items-table tr td .entry')
      )
      .get(itemNo)

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.confirmationComponent);
  }
}

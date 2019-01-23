import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class OrderConfirmationPage extends AppPage {
  readonly page: ElementFinder = element(
    by.tagName('cx-order-confirmation-page')
  );
  readonly confirmationComponent: ElementFinder = this.page.element(
    by.tagName('cx-order-confirmation')
  );
  readonly confirmationHeader: ElementFinder = this.confirmationComponent.element(
    by.css('.cx-page__title')
  );
  readonly confimationMessage: ElementFinder = this.confirmationComponent.element(
    by.css('.cx-order-confirmation__message h2')
  );

  readonly shippingAddress: ElementFinder = this.confirmationComponent
    .all(by.css('.cx-order-confirmation__review-summary-card'))
    .get(0);
  readonly shippingMethod: ElementFinder = this.confirmationComponent
    .all(by.css('.cx-order-confirmation__review-summary-card'))
    .get(2);
  readonly paymentMethod: ElementFinder = this.confirmationComponent
    .all(by.css('.cx-order-confirmation__review-summary-card'))
    .get(3);
  readonly billingAddress: ElementFinder = this.confirmationComponent
    .all(by.css('.cx-order-confirmation__review-summary-card'))
    .get(1);
  readonly orderSummary: ElementFinder = this.page.element(
    by.tagName('cx-order-summary')
  );

  readonly orderItem = (itemNo: number): ElementFinder =>
    this.page
      .all(by.css('.cx-order-confirmation__order-items .cx-item-list-row'))
      .get(itemNo);

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.confirmationComponent);
  }
}

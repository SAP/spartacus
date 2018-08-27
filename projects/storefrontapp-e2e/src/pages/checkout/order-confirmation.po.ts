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

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.confirmationComponent);
  }
}

import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class AutocompletePanel {
  readonly panelElement: ElementFinder = element(
    by.css('div[class=cdk-overlay-container] div[role="listbox"]')
  );
  readonly suggestionSpanByText = (text: string): ElementFinder =>
    this.panelElement
      .all(by.cssContainingText('.mat-option-text', text))
      .first();

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.panelElement);
  }

  async selectProduct(productName: string) {
    await this.suggestionSpanByText(productName).click();
  }
}

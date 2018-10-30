import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class AutocompletePanel {
  readonly panelElement: ElementFinder = element(
    by.css('.y-search-box__dropdown-content-product')
  );
  readonly suggestionSpanByText = (text: string): ElementFinder =>
    this.panelElement
      .all(
        by.cssContainingText(
          '.y-search-box__dropdown-content-product-name',
          text
        )
      )
      .first();

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.panelElement);
  }

  async selectProduct(productName: string) {
    await this.suggestionSpanByText(productName).click();
  }
}

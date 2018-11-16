import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class AutocompletePanel {
  readonly searchBox: ElementFinder = element(by.css('.cx-search-box'));
  readonly panelElement: ElementFinder = element(
    by.css('.cx-search-box__dropdown-content-product')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.panelElement);
  }

  async selectProduct(productName: string) {
    await this.searchBox
      .all(
        by.cssContainingText(
          '.cx-search-box__dropdown-content-product',
          productName
        )
      )
      .first()
      .click();
  }
}

import {
  ElementFinder,
  browser,
  protractor,
  ExpectedConditions,
  promise,
  element,
  by
} from 'protractor';

export class E2EUtil {
  /**
   * Fills a given input with the desired value
   * @param input the input element
   * @param value the value to fill
   * @param skipEnter if true, will fill the form but won't press enter (optional param)
   */
  static async fillInput(
    input: ElementFinder,
    value: string,
    skipEnter?: boolean
  ) {
    await input.sendKeys(value);

    if (!skipEnter) {
      await browser
        .actions()
        .sendKeys(protractor.Key.ENTER)
        .perform();
    }
  }

  /**
   * Wait until a given text is visible in the element
   * @param elem The element
   */
  static wait4TextInElement(elem: ElementFinder, text: string): any {
    return browser.wait(
      ExpectedConditions.textToBePresentInElement(elem, text)
    );
  }

  /**
   * Wait until a given element is visible on the browser
   * @param elem The element
   */
  static wait4VisibleElement(elem: ElementFinder): promise.Promise<{}> {
    return browser.wait(ExpectedConditions.visibilityOf(elem));
  }

  /**
   * Wait until a given element is present on the browser
   * @param elem The element
   */
  static wait4PresentElement(elem: ElementFinder): promise.Promise<{}> {
    return browser.wait(ExpectedConditions.presenceOf(elem));
  }

  /**
   * Wait until a given element is NOT visible on the browser
   * @param elem The element
   */
  static wait4NotVisibleElement(elem: ElementFinder): promise.Promise<{}> {
    return browser.wait(
      ExpectedConditions.not(ExpectedConditions.visibilityOf(elem))
    );
  }

  /**
   * Finds price in text by looking for $ sign
   * @param textWithPrice
   */
  static findPrice(textWithPrice: string) {
    return textWithPrice.slice(textWithPrice.indexOf('$'));
  }

  /**
   * Select option from <select> element by text
   * @param selectElement
   * @param text
   */
  static selectOptionByText(selectElement: ElementFinder, text: string) {
    return selectElement
      .all(by.cssContainingText('option', text))
      .get(0)
      .click();
  }

  /**
   * Select option from <ng-select> element by text
   * @param selectElement
   * @param text
   */
  static async selectNgSelectOptionByText(
    selectElement: ElementFinder,
    text: string
  ) {
    selectElement.element(by.css('.ng-select-container')).click();
    await this.wait4VisibleElement(element(by.css('.ng-dropdown-panel-items')));

    return selectElement
      .all(by.cssContainingText('.ng-option', text))
      .first()
      .click();
  }

  /**
   * Select option from <select> element by option number
   * @param selectElement
   * @param optionNo
   */
  static selectOptionByNo(selectElement: ElementFinder, optionNo: number) {
    return selectElement
      .all(by.tagName('option'))
      .get(optionNo)
      .click();
  }

  static async scrollToElement(elementSelector: string) {
    await browser.executeScript(
      `document.querySelector("${elementSelector}").scrollIntoView()`
    );
  }
}

import {
  element,
  by,
  ElementFinder,
  browser,
  protractor,
  ExpectedConditions,
  promise
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
   * Gets the overlay element (mostly used for modals and temporary elements on the page).
   */
  static getOverlayContainer(): ElementFinder {
    return element(by.css(`div[class=cdk-overlay-container]`));
  }

  /**
   * Wait until a given element is visible on the browser
   * @param elem The element
   */
  static wait4VisibleElement(elem: ElementFinder): promise.Promise<{}> {
    return browser.wait(ExpectedConditions.visibilityOf(elem));
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
   * Checks if text in an element matches a given value
   * @param elem element containing text
   * @param value expected text value
   * @param errMsg message in case value doesn't match
   */
  static checkTextValue(
    elem: ElementFinder,
    value: string,
    errMsg: string
  ): promise.Promise<void> {
    return E2EUtil.wait4VisibleElement(elem).then(() => {
      elem.getText().then(text => {
        expect(text).toBe(value, errMsg);
      });
    });
  }

  /**
   * Finds price in text by looking for $ sign
   * @param textWithPrice
   */
  static findPrice(textWithPrice: string) {
    return textWithPrice.slice(textWithPrice.indexOf('$'));
  }
}

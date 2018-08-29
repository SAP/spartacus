import {
  element,
  by,
  ElementArrayFinder,
  ElementFinder,
  browser,
  protractor,
  ExpectedConditions,
  promise
} from 'protractor';

export class E2EUtil {
  /**
   * Get a cms component given the component selector name.
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   */
  static getComponent(componentSelector: string): ElementFinder {
    return element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component selector name.
   * @param slotPosition position for the slot that holds the component
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the component found
   */
  static getComponentWithinDynamicSlot(
    slotPosition: string,
    componentSelector: string
  ): ElementFinder {
    const parent = element(by.css(`y-dynamic-slot[position=${slotPosition}]`));
    return parent.element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component selector name.
   * @param parentSelector An id to be used to search the parent
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the component found
   */
  static getComponentWithinParent(
    parent: ElementFinder,
    componentSelector: string
  ): ElementFinder {
    return parent.element(by.tagName(componentSelector));
  }

  /**
   * Get a cms component given a parent component and the component css identifier.
   * @param parentSelector An id to be used to search the parent
   * @param componentCss The css declared on the component (used to identify the element)
   * @returns the component found
   */
  static getComponentWithinParentByCss(
    parent: ElementFinder,
    componentCss: string
  ): ElementFinder {
    return parent.element(by.css(componentCss));
  }

  /**
   * Get a cms component given a parent component and the component css identifier.
   * @param parentSelector An id to be used to search the parent
   * @param componentClass The css class declared on the component (used to identify the element)
   * @returns the component found
   */
  static getComponentWithinParentByClass(
    parent: ElementFinder,
    componentClass: string
  ): ElementFinder {
    return parent.element(by.className(componentClass));
  }

  /**
   * Get all matching cms components with a given selector inside a parent element.
   * @param parent parent element where component can be found
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   * @returns the array of elements that matches the search
   */
  static getComponentsWithinParent(
    parent: ElementFinder,
    componentSelector: string
  ): ElementArrayFinder {
    return parent.all(by.tagName(componentSelector));
  }

  /**
   * Finds an input inside a parent
   * @param parent parent element where input can be found
   * @param formControlName input identifier
   */
  static getInputByFormControlName(
    parent: ElementFinder,
    formControlName: string
  ): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      parent,
      `input[formcontrolname=${formControlName}]`
    );
  }

  /**
   * Fills a given input with the desired value
   * @param input the input element
   * @param value the value to fill
   * @param skipEnter if true, will fill the form but won't press enter (optional param)
   */
  static fillInput(input: ElementFinder, value: string, skipEnter?: boolean) {
    input.sendKeys(value);

    if (!skipEnter) {
      browser
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
}

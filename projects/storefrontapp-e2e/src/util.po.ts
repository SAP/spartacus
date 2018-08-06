import {
  element,
  by,
  ElementArrayFinder,
  ElementFinder,
  browser,
  protractor
} from 'protractor';
import { print } from 'util';

export class E2EUtil {
  /**
   * Get a cms component given the component selector name.
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   */
  static getComponent(componentSelector: string) {
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

  static getOverlayContainer(): ElementFinder {
    return element(by.css(`div[class=cdk-overlay-container]`));
  }
}

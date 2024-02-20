/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Common quote component test utils service provides helper functions for the component tests.
 */
export class CommonQuoteTestUtilsService {
  /**
   * Helper function for verifying whether the element is present in the HTML tree.
   *
   * @param expect - Expectation for a spec.
   * @param element - HTML element.
   * @param querySelector - Query selector.
   */
  static expectElementPresent(
    expect: any,
    element: Element,
    querySelector: string
  ) {
    expect(element.querySelectorAll(querySelector).length).toBeGreaterThan(
      0,
      `expected element identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${element.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the expected number of elements is present in the HTML tree.
   *
   * @param expect - Expectation for a spec.
   * @param element - HTML element.
   * @param querySelector - Query selector.
   * @param numberOfElements - Number of elements.
   */
  static expectNumberOfElementsPresent(
    expect: any,
    element: Element,
    querySelector: string,
    numberOfElements: number
  ) {
    expect(element.querySelectorAll(querySelector).length).toBe(
      numberOfElements,
      `expected elements identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${element.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the element contains text.
   *
   * @param expect - Expectation for a spec.
   * @param element - HTML element.
   * @param querySelector - Query selector.
   * @param expectedText - Expected text.
   * @param index - Optional index of the element.
   */
  static expectElementToContainText(
    expect: any,
    element: Element,
    querySelector: string,
    expectedText: string,
    index?: number
  ) {
    let text;
    if (index) {
      text = element.querySelectorAll(querySelector)[index]?.textContent;
    } else {
      text = element.querySelector(querySelector)?.textContent;
    }
    expect(text).toContain(expectedText);
  }

  /**
   * Helper function for verifying whether the element is not present in the HTML tree.
   *
   * @param expect - Expectation for a spec.
   * @param element - HTML element.
   * @param querySelector - Query selector.
   */
  static expectElementNotPresent(
    expect: any,
    element: Element,
    querySelector: string
  ) {
    expect(element.querySelectorAll(querySelector).length).toBe(
      0,
      `expected element identified by selector '${querySelector}' to be NOT present, but it is! innerHtml: ${element.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the element contains attribute.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param attributeName - Name of the attribute.
   */
  static expectElementToContainAttribute(
    expect: any,
    htmlElement: HTMLElement,
    attributeName: string
  ) {
    expect(htmlElement.getAttributeNames().indexOf(attributeName) >= 0).toBe(
      true,
      `expected element should contain attribute name '${attributeName}', but it is NOT!`
    );
  }

  /**
   * Helper function for verifying whether the element does not contain attribute.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param attributeName - Name of the attribute.
   */
  static expectElementNotToContainAttribute(
    expect: any,
    htmlElement: HTMLElement,
    attributeName: string
  ) {
    expect(htmlElement.getAttributeNames().indexOf(attributeName) <= -1).toBe(
      true,
      `expected element should not contain attribute name '${attributeName}', but it is NOT!`
    );
  }

  /**
   * Retrieves a HTML element by its query selector.
   * If there are more than one element in the HTML tree,
   * one could give the index of the searched element.
   *
   * Fails if no element is found.
   *
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector.
   * @param index - Optional index of the element.
   * @returns searched HTML element
   */
  static getHTMLElement(
    htmlElement: Element,
    querySelector: string,
    index?: number
  ): HTMLElement {
    let element: Element | null;
    if (index) {
      element = htmlElement.querySelectorAll(querySelector).item(index);
    } else {
      element = htmlElement.querySelector(querySelector);
    }
    if (!element) {
      const indexString = index ? 'with index=' + index : '';
      fail(
        `expected element ${indexString} identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${htmlElement.innerHTML}`
      );
    }
    return element as HTMLElement;
  }

  /**
   * Clicks first toggle element found.
   *
   * @param element - HTML element.
   * @param useKeyboard - optional - if 'true' the click is executed using the enter key,
   *  otherwise a mouse click is used. 'false' is default.
   */
  static clickToggle(element: Element, useKeyboard: boolean) {
    const caret = CommonQuoteTestUtilsService.getHTMLElement(
      element,
      '.cx-toggle'
    );
    if (useKeyboard) {
      caret.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
    } else {
      caret.click();
    }
  }

  protected static collectElementsWithClassName(
    elements: Element[],
    tagClass: string,
    foundElements: Element[]
  ) {
    elements.forEach((element) => {
      const classList = element.classList;
      if (classList.length >= 1) {
        classList.forEach((elementClass) => {
          if (elementClass === tagClass) {
            foundElements.push(element);
          }
        });
      }
    });
  }

  /**
   * Retrieves a HTML element by its class name or the order within the HTML tree.
   * If there are more than one element in the HTML tree,
   * one could give the index of the searched element.
   *
   * @param htmlElement - whole HTML element
   * @param tagName - tag name
   * @param tagClass - class name of element
   * @param tagIndex - index of the element
   * @returns searched HTML element
   */
  static getElementByClassNameOrTreeOrder(
    htmlElements: HTMLElement,
    tagName: string,
    tagClass?: string,
    tagIndex?: number
  ): Element | undefined {
    const foundElements: Element[] = [];
    const elements = Array.from(htmlElements.getElementsByTagName(tagName));
    if (!tagClass) {
      return !tagIndex ? elements[0] : elements[tagIndex];
    } else {
      CommonQuoteTestUtilsService.collectElementsWithClassName(
        elements,
        tagClass,
        foundElements
      );
      return tagIndex ? foundElements[tagIndex] : foundElements[0];
    }
  }

  /**
   * Helper function for proving whether the element contains corresponding accessibility attribute with expected content.
   *
   * @param expect - Expectation for a spec
   * @param element - HTML element
   * @param a11yAttr - A11y attribute
   * @param a11yAttrContent - Content of a11y attribute
   */
  static expectElementContainsA11y(
    expect: any,
    element?: Element,
    a11yAttr?: string,
    a11yAttrContent?: string
  ) {
    const attributes = element?.attributes;

    if (a11yAttr) {
      expect(attributes?.hasOwnProperty(a11yAttr)).toBe(true);
      if (a11yAttrContent) {
        expect(element?.getAttribute(a11yAttr)).toEqual(a11yAttrContent);
      }
    }
  }
}

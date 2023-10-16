/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   */
  static expectElementPresent(
    expect: any,
    htmlElement: Element,
    querySelector: string
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBeGreaterThan(
      0,
      `expected element identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${htmlElement.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the expected number of elements is present in the HTML tree.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {number} numberOfElements - Number of elements.
   */
  static expectNumberOfElementsPresent(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    numberOfElements: number
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBe(
      numberOfElements,
      `expected elements identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${htmlElement.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the element contains text.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {any} expectedText - Expected text.
   * @param {number} index - Optional index of the element.
   */
  static expectElementToContainText(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    expectedText: string,
    index?: number
  ) {
    let text;
    if (index) {
      text = htmlElement.querySelectorAll(querySelector)[index]?.textContent;
    } else {
      text = htmlElement.querySelector(querySelector)?.textContent;
    }
    expect(text).toContain(expectedText);
  }

  /**
   * Helper function for verifying whether the element is not present in the HTML tree.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   */
  static expectElementNotPresent(
    expect: any,
    htmlElement: Element,
    querySelector: string
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBe(
      0,
      `expected element identified by selector '${querySelector}' to be NOT present, but it is! innerHtml: ${htmlElement.innerHTML}`
    );
  }

  /**
   * Helper function for verifying whether the element contains attribute.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {string} attributeName - Name of the attribute.
   * @param {number} index - Optional index of the element.
   */
  static expectElementToContainAttribute(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    attributeName: string,
    index?: number
  ) {
    const element = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElement,
      querySelector,
      index
    );
    expect(element.getAttributeNames().indexOf(attributeName) >= 0).toBe(
      true,
      `expected elements identified by selector '${querySelector}' should contain attribute name '${attributeName}', but it is NOT!`
    );
  }

  /**
   * Helper function for verifying whether the element does not contain attribute.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {string} attributeName - Name of the attribute.
   * @param {number} index - Optional index of the element.
   */
  static expectElementNotToContainAttribute(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    attributeName: string,
    index?: number
  ) {
    const element = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElement,
      querySelector,
      index
    );
    expect(element.getAttributeNames().indexOf(attributeName) <= -1).toBe(
      true,
      `expected elements identified by selector '${querySelector}' should not contain attribute name '${attributeName}', but it is NOT!`
    );
  }

  /**
   * Retrieves a HTML element by its query selector.
   * If there are more than one element in the HTML tree,
   * one could give the index of the searched element.
   *
   * Fails if no element is found.
   *
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {number} index - Optional index of the element.
   * @returns {HTMLElement} - searched HTML element
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
   * @param {Element} htmlElement - HTML element.
   * @param {boolean} useKeyboard - optional - if 'true' the click is executed using the enter key,
   *  otherwise a mouse click is used. 'false' is default.
   */
  static clickToggle(htmlElement: Element, useKeyboard: boolean) {
    const caret = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElement,
      '.cx-toggle'
    );
    if (useKeyboard) {
      caret.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
    } else {
      caret.click();
    }
  }

  protected static collectFountElements(
    elements: Element[],
    tagClass: string,
    foundElement: Element[]
  ) {
    elements.forEach((element) => {
      const classList = element.classList;
      if (classList.length >= 1) {
        classList.forEach((elementClass) => {
          if (elementClass === tagClass) {
            foundElement.push(element);
          }
        });
      }
    });
  }

  protected static getElement(
    htmlElements: HTMLElement,
    tag: string,
    tagClass?: string,
    tagIndex?: number
  ): Element | undefined {
    const foundElement: Element[] = [];
    const elements = Array.from(htmlElements.getElementsByTagName(tag));
    if (!tagClass) {
      return !tagIndex ? elements[0] : elements[tagIndex];
    } else {
      CommonQuoteTestUtilsService.collectFountElements(
        elements,
        tagClass,
        foundElement
      );
      return tagIndex ? foundElement[tagIndex] : foundElement[0];
    }
  }

  /**
   * Helper function for proving whether the element contains corresponding accessibility attribute with expected content.
   *
   * @param expect - Expectation for a spec
   * @param htmlElement - whole HTML element
   * @param tag - certain HTML element
   * @param tagClass - Class of the HTML element
   * @param tagIndex - Index of HTML element
   * @param a11yAttr - A11y attribute
   * @param a11yAttrContent - Content of a11y attribute
   */
  static expectElementContainsA11y(
    expect: any,
    htmlElement: HTMLElement,
    tag: string,
    tagClass?: string,
    tagIndex?: number,
    a11yAttr?: string,
    a11yAttrContent?: string
  ) {
    const item = CommonQuoteTestUtilsService.getElement(
      htmlElement,
      tag,
      tagClass,
      tagIndex
    );

    const attributes = item?.attributes;
    if (a11yAttr) {
      expect(attributes?.hasOwnProperty(a11yAttr)).toBe(true);
      if (a11yAttrContent) {
        expect(item?.getAttribute(a11yAttr)).toEqual(a11yAttrContent);
      }
    }
  }
}

/**
 * Common configurator component test utils service provides helper functions for the component tests.
 */

export class CommonConfiguratorTestUtilsService {
  /**
   * Helper function for proving whether the element is present in the DOM tree.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector
   */
  static expectElementPresent(
    expect: any,
    htmlElement: Element,
    querySelector: string
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBeGreaterThan(
      0,
      "expected element identified by selector '" +
        querySelector +
        "' to be present, but it is NOT! innerHtml: " +
        htmlElement.innerHTML
    );
  }

  /**
   * Helper function for proving whether the element contains text.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector
   * @param expectedText - Expected text
   */
  static expectElementToContainText(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    expectedText: string
  ) {
    const text = htmlElement.querySelector(querySelector)?.textContent;
    expect(text ? text.trim() : '').toBe(expectedText);
  }

  /**
   * Helper function for proving whether the element is not present in the DOM tree.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector
   */
  static expectElementNotPresent(
    expect: any,
    htmlElement: Element,
    querySelector: string
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBe(
      0,
      "expected element identified by selector '" +
        querySelector +
        "' to be NOT present, but it is! innerHtml: " +
        htmlElement.innerHTML
    );
  }

  /**
   * Helper function for proving how many times the element comes in the DOM tree.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector
   * @param {number} expectedNumber- expected number of elements
   */
  static expectNumberOfElements(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    expectedNumber: number
  ) {
    expect(htmlElement.querySelectorAll(querySelector).length).toBe(
      expectedNumber,
      "expected elements identified by selector '" +
        querySelector +
        "' to be present times, but it is NOT! innerHtml: " +
        htmlElement.innerHTML
    );
  }

  protected static getHTMLElement(
    htmlElements: HTMLElement,
    tag: string,
    tagClass?: string,
    tagIndex?: number
  ): Element | undefined {
    let foundElement: Element[] = [];
    const elements = htmlElements.getElementsByTagName(tag);
    if (!tagClass) {
      if (!tagIndex) {
        return elements[0];
      } else {
        return elements[tagIndex];
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        const classList = elements[i].classList;
        if (classList.length >= 1) {
          for (let j = 0; j < classList.length; j++) {
            if (classList[j] === tagClass) {
              foundElement.push(elements[i]);
            }
          }
        }
      }

      if (tagIndex) {
        return foundElement[tagIndex];
      } else {
        return foundElement[0];
      }
    }
  }

  /**
   * Helper function for proving whether the element contains corresponding accessibility attribute with expected content.
   *
   * @param expect - Expectation for a spec
   * @param htmlElement - HTML element
   * @param a11yAttr -  A11y attribute
   * @param a11yAttrContent - Expected a11y attribute content
   * @param innerHTML - Expected inner HTML content
   */
  static expectElementContainsA11y(
    expect: any,
    htmlElement: HTMLElement,
    tag: string,
    tagClass?: string,
    tagIndex?: number,
    a11yAttr?: string,
    a11yAttrContent?: string,
    innerHTML?: string
  ) {
    const item = CommonConfiguratorTestUtilsService.getHTMLElement(
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
    if (innerHTML) {
      expect(item?.innerHTML.indexOf(innerHTML)).not.toEqual(-1);
    }
  }
}

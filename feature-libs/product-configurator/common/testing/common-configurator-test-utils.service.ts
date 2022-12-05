/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
      `expected element identified by selector '${querySelector}' to be present, but it is NOT! innerHtml: ${htmlElement.innerHTML}`
    );
  }

  /**
   * Helper function for proving whether the expected number of elements is present in the DOM tree.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector
   * @param numberOfElements - Number of elements
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
    expectedText: string,
    index?: number
  ) {
    let text;
    if (index) {
      text = htmlElement.querySelectorAll(querySelector)[index]?.textContent;
    } else {
      text = htmlElement.querySelector(querySelector)?.textContent;
    }
    expect(text ? text.trim() : '').toBe(expectedText);
  }

  /**
   * Helper function for proving whether an element's attribute has a certain value.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector
   * @param {string} attributeName - name of attribute to check
   * @param {string} expectedValue - expected attribute value
   * @param {number?} index - optional - index of the element identified by the query selector
   */
  static expectElementToHaveAttributeWithValue(
    expect: any,
    htmlElement: Element,
    querySelector: string,
    attributeName: string,
    expectedValue: string,
    index: number = 0
  ) {
    let element = htmlElement.querySelectorAll(querySelector)[index];
    expect(element)
      .withContext(
        `expected element identified by selector '${querySelector}[${index}]'
        to be present, but it has NOT!`
      )
      .toBeDefined();

    let attributeValue = element?.getAttribute(attributeName);
    expect(attributeValue)
      .withContext(
        `expected element identified by selector '${querySelector}[${index}]'
         to have an attribute with name '${attributeName}', but it has NOT!`
      )
      .not.toBe(null);

    expect(attributeValue ? attributeValue.trim() : '').toEqual(expectedValue);
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
      `expected element identified by selector '${querySelector}' to be NOT present, but it is! innerHtml: ${htmlElement.innerHTML}`
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
      `expected elements identified by selector '${querySelector}' to be present times, but it is NOT! innerHtml: ${htmlElement.innerHTML}`
    );
  }

  protected static getHTMLElement(
    htmlElements: HTMLElement,
    tag: string,
    tagClass?: string,
    tagIndex?: number
  ): Element | undefined {
    const foundElement: Element[] = [];
    const elements = htmlElements.getElementsByTagName(tag);
    if (!tagClass) {
      return !tagIndex ? elements[0] : elements[tagIndex];
    } else {
      CommonConfiguratorTestUtilsService.collectElements(
        elements,
        tagClass,
        foundElement
      );
      return tagIndex ? foundElement[tagIndex] : foundElement[0];
    }
  }

  protected static collectElements(
    elements: HTMLCollectionOf<Element>,
    tagClass: string,
    foundElement: Element[]
  ) {
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

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
    expect(text ? text.trim() : '').toBe(expectedText);
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
   * Helper function for verifying how many times the element comes in the HTML tree.
   *
   * @param {any} expect - Expectation for a spec.
   * @param {Element} htmlElement - HTML element.
   * @param {string} querySelector - Query selector.
   * @param {number} expectedNumber - expected number of elements.
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
    if (element) {
      expect(element.getAttributeNames().indexOf(attributeName) >= 0).toBe(
        true,
        `expected elements identified by selector '${querySelector}' should contain attribute name '${attributeName}', but it is NOT!`
      );
    }
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
    if (element) {
      expect(element.getAttributeNames().indexOf(attributeName) <= -1).toBe(
        true,
        `expected elements identified by selector '${querySelector}' should not contain attribute name '${attributeName}', but it is NOT!`
      );
    }
  }

  /**
   * Retrieves a HTML element by its query selector.
   * If there are more than one element in the HTML tree,
   * one could give the index of the searched element.
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
  ): HTMLElement | null {
    if (index) {
      return htmlElement
        .querySelectorAll(querySelector)
        .item(index) as HTMLElement;
    } else {
      return htmlElement.querySelector(querySelector);
    }
  }
}

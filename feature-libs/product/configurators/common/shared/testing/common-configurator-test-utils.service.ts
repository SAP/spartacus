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
    expect,
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
    expect,
    htmlElement: Element,
    querySelector: string,
    expectedText: string
  ) {
    expect(htmlElement.querySelector(querySelector).textContent.trim()).toBe(
      expectedText
    );
  }

  /**
   * Helper function for proving whether the element is not present in the DOM tree.
   *
   * @param expect - Expectation for a spec.
   * @param htmlElement - HTML element.
   * @param querySelector - Query selector
   */
  static expectElementNotPresent(
    expect,
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
}

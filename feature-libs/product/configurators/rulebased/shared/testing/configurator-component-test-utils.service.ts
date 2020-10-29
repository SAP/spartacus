/**
 * Configurator component test utils service provides helper functions for the component tests.
 */

import { Configurator } from '../../core/model/configurator.model';

export class ConfiguratorComponentTestUtilsService {
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

  /**
   * Deep freezes a product configuration, used for testing purposed to ensure test
   * data behaves read-only
   * @param productConfiguration
   */
  static freezeProductConfiguration(
    productConfiguration: Configurator.Configuration
  ) {
    Object.freeze(productConfiguration);
    Object.freeze(productConfiguration.interactionState);
    Object.freeze(productConfiguration.owner);
    Object.freeze(productConfiguration.nextOwner);
    this.freezeOverview(productConfiguration.overview);
    this.freezePriceSummary(productConfiguration.priceSummary);
    productConfiguration.flatGroups?.forEach((group) =>
      this.freezeGroup(group)
    );
    productConfiguration.groups?.forEach((group) => this.freezeGroup(group));
  }

  protected static freezeGroup(group: Configurator.Group) {
    Object.freeze(group);
    group.attributes?.forEach((attribute) => this.freezeAttribute(attribute));
    group.subGroups?.forEach((subGroup) => this.freezeGroup(subGroup));
  }

  protected static freezeAttribute(attribute: Configurator.Attribute) {
    Object.freeze(attribute);
    attribute.images?.forEach((image) => Object.freeze(image));
    attribute.values?.forEach((value) => this.freezeValue(value));
  }

  protected static freezeValue(value: Configurator.Value) {
    Object.freeze(value);
    value.images?.forEach((image) => Object.freeze(image));
  }

  static freezeOverview(overview: Configurator.Overview) {
    if (overview) {
      Object.freeze(overview);
      this.freezePriceSummary(overview.priceSummary);
      overview.groups?.forEach((ovGroup) => this.freezeOvGroup(ovGroup));
    }
  }

  protected static freezeOvGroup(overviewGroup: Configurator.GroupOverview) {
    Object.freeze(overviewGroup);
    overviewGroup.attributes?.forEach((ovAttribute) =>
      Object.freeze(ovAttribute)
    );
  }

  protected static freezePriceSummary(priceSummary: Configurator.PriceSummary) {
    if (priceSummary) {
      Object.freeze(priceSummary);
      Object.freeze(priceSummary.basePrice);
      Object.freeze(priceSummary.currentTotal);
      Object.freeze(priceSummary.currentTotalSavings);
      Object.freeze(priceSummary.selectedOptions);
    }
  }
}

/**
 * Configurator component test utils service provides helper functions for the component tests.
 */

import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model';

export class ConfiguratorTestUtils {
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

  static createConfiguration(
    configId: string,
    owner: CommonConfigurator.Owner = ConfiguratorModelUtils.createInitialOwner()
  ): Configurator.Configuration {
    const configuration: Configurator.Configuration = {
      configId: configId,
      owner: owner,
      groups: [],
      interactionState: {},
    };
    return configuration;
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

/**
 * Configurator component test utils service provides helper functions for the component tests.
 */

import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../core/model/configurator.model';

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
    productConfiguration.flatGroups.forEach((group) => this.freezeGroup(group));
    productConfiguration.groups.forEach((group) => this.freezeGroup(group));
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

  static freezeOverview(overview?: Configurator.Overview) {
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
      flatGroups: [],
      interactionState: {},
    };
    return configuration;
  }

  static createGroup(groupId: string): Configurator.Group {
    const group: Configurator.Group = {
      id: groupId,
      subGroups: [],
      attributes: [],
    };
    return group;
  }

  protected static freezeOvGroup(overviewGroup: Configurator.GroupOverview) {
    Object.freeze(overviewGroup);
    overviewGroup.attributes?.forEach((ovAttribute) =>
      Object.freeze(ovAttribute)
    );
  }

  protected static freezePriceSummary(
    priceSummary?: Configurator.PriceSummary
  ) {
    if (priceSummary) {
      Object.freeze(priceSummary);
      Object.freeze(priceSummary.basePrice);
      Object.freeze(priceSummary.currentTotal);
      Object.freeze(priceSummary.currentTotalSavings);
      Object.freeze(priceSummary.selectedOptions);
    }
  }

  protected static createValueSupplement(
    valueKey: string,
    formattedValuePrice: string,
    valuePrice: number
  ): Configurator.ValueSupplement {
    return {
      attributeValueKey: valueKey,
      priceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
      obsoletePriceValue: {
        currencyIso: '',
        formattedValue: formattedValuePrice,
        value: valuePrice,
      },
    };
  }

  protected static createListOfValueSupplements(
    attributeNr: number,
    amountOfValues: number
  ): Configurator.ValueSupplement[] {
    const valueSupplements: Configurator.ValueSupplement[] = [];
    for (let index = 0; index < amountOfValues; index++) {
      const number = index + 1;
      const factor = attributeNr * number;
      const valueKey = 'value_' + attributeNr + '_' + number;
      const valuePrice = 100 * factor;
      const formattedValuePrice = valuePrice.toString() + ' €';
      const valueSupplement = this.createValueSupplement(
        valueKey,
        formattedValuePrice,
        valuePrice
      );
      valueSupplements.push(valueSupplement);
    }
    return valueSupplements;
  }

  protected static createAttributeSupplement(
    attributeNr: number,
    attributeUiKey: string,
    amountOfValues: number
  ): Configurator.AttributeSupplement {
    const valueSupplements = this.createListOfValueSupplements(
      attributeNr,
      amountOfValues
    );
    return {
      attributeUiKey: attributeUiKey,
      valueSupplements: valueSupplements,
    };
  }

  static createListOfAttributeSupplements(
    isMultiLevel: boolean,
    numberOfGroups: number,
    numberOfSubgroups: number,
    numberOfSupplements: number,
    numberOfValues: number
  ): Configurator.AttributeSupplement[] {
    let attributeSupplements: Configurator.AttributeSupplement[] = [];
    for (let i = 0; i < numberOfGroups; i++) {
      const groupNr = i + 1;
      let uiKey = 'group' + groupNr + '@';
      if (isMultiLevel) {
        for (let k = 0; k < numberOfSubgroups; k++) {
          const subgroupNr = k + 1;
          uiKey += 'subGroup' + subgroupNr + '@';
        }
      }
      for (let j = 0; j < numberOfSupplements; j++) {
        const attributeNr = j + 1;
        const csticUiKey = uiKey + 'attribute_' + groupNr + '_' + attributeNr;
        const attributeSupplement = this.createAttributeSupplement(
          attributeNr,
          csticUiKey,
          numberOfValues
        );
        attributeSupplements.push(attributeSupplement);
      }
    }

    return attributeSupplements;
  }

  static createListOfValues(
    attributeNr: number,
    amountOfValues: number
  ): Configurator.Value[] {
    let values: Configurator.Value[] = [];
    for (let index = 0; index < amountOfValues; index++) {
      const valueNr = index + 1;
      const valueCode: string = 'value_' + attributeNr + '_' + valueNr;
      let value: Configurator.Value = {
        valueCode: valueCode,
        valuePrice: {
          value: 0,
          currencyIso: '$',
        },
      };

      values.push(value);
    }
    return values;
  }

  static createListOfAttributes(
    groupNr: number,
    amountOfAttributes: number,
    amountOfValues: number
  ): Configurator.Attribute[] {
    const attributes: Configurator.Attribute[] = [];
    for (let j = 0; j < amountOfAttributes; j++) {
      const attributeNr = j + 1;
      const attributeName = 'attribute_' + groupNr + '_' + attributeNr;
      const values = this.createListOfValues(attributeNr, amountOfValues);
      const attribute: Configurator.Attribute = {
        name: attributeName,
        values: values,
      };

      attributes.push(attribute);
    }
    return attributes;
  }

  protected static createComplexGroup(
    groupNr: number,
    groupId: string,
    numberOfSubgroups: number,
    numberOfAttributes: number,
    numberOfValues: number
  ): Configurator.Group {
    const groupType: Configurator.GroupType =
      numberOfSubgroups === 0
        ? Configurator.GroupType.ATTRIBUTE_GROUP
        : Configurator.GroupType.SUB_ITEM_GROUP;
    let group: Configurator.Group = {
      id: groupId,
      attributes: [],
      groupType: groupType,
      subGroups: [],
    };
    if (numberOfSubgroups > 0) {
      let subGroupNr = groupNr;
      let subGroupId = groupId.concat('@subGroup') + subGroupNr;
      let subGroup = this.createComplexGroup(
        subGroupNr + 1,
        subGroupId,
        numberOfSubgroups - 1,
        numberOfAttributes,
        numberOfValues
      );

      group.subGroups.push(subGroup);
    } else {
      if (group.id.indexOf('subGroup') !== -1) {
        const keys = group.id.split('@');
        const currentGroupId = keys[0];
        groupNr = +currentGroupId.replace('group', '');
      }
      group.attributes = this.createListOfAttributes(
        groupNr,
        numberOfAttributes,
        numberOfValues
      );
    }

    return group;
  }

  static createListOfGroups(
    numberOfGroups: number,
    numberOfSubgroups: number,
    numberOfAttributes: number,
    numberOfValues: number
  ): Configurator.Group[] {
    let groups: Configurator.Group[] = [];
    for (let i = 0; i < numberOfGroups; i++) {
      const groupNr = i + 1;
      let groupId = 'group' + groupNr;
      const group = this.createComplexGroup(
        groupNr,
        groupId,
        numberOfSubgroups,
        numberOfAttributes,
        numberOfValues
      );
      groups.push(group);
    }
    return groups;
  }
}

import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantPriceNormalizer
  implements Converter<OccConfigurator.Prices, Configurator.Configuration> {
  convert(
    source: OccConfigurator.Prices,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const resultTarget: Configurator.Configuration = {
      ...target,
      priceSummary: source.priceSummary,
      groups: [],
    };

    source?.attributes.forEach((attr) => {
      const uiKeys = attr?.csticUiKey.split('@');
      const attribute = this.convertAttribute(
        uiKeys.pop(),
        this.convertValue(attr?.priceSupplements)
      );

      const group = this.convertGroup(resultTarget?.groups, uiKeys[0]);

      if (uiKeys.length === 1) {
        group?.attributes.push(attribute);
      } else {
        let subGroups = group?.subGroups;
        let subGroupId = uiKeys[0];
        for (let index = 1; index < uiKeys.length; index++) {
          subGroupId = subGroupId.concat('@');
          subGroupId = subGroupId.concat(uiKeys[index]);
          const subGroup = this.convertGroup(subGroups, subGroupId);

          if (index === uiKeys.length - 1) {
            subGroup?.attributes.push(attribute);
          }
          this.addGroup(subGroups, subGroup);
          subGroups = subGroup?.subGroups;
        }
      }
      this.addGroup(resultTarget?.groups, group);
    });

    return resultTarget;
  }

  addGroup(groups: Configurator.Group[], group: Configurator.Group) {
    if (groups?.indexOf(group) === -1) {
      groups?.push(group);
    }
  }

  convertGroup(
    groups: Configurator.Group[],
    groupId: string
  ): Configurator.Group {
    let group = groups?.find((group) => group.id === groupId);

    if (!group) {
      group = {
        id: groupId,
        subGroups: [],
        attributes: [],
      };
    }
    return group;
  }

  convertValue(
    occValues: OccConfigurator.ValueSupplements[]
  ): Configurator.Value[] {
    let values: Configurator.Value[] = [];
    occValues.forEach((occValue) => {
      const value: Configurator.Value = {
        valueCode: occValue.attributeValueKey,
        valuePrice: occValue.priceValue,
      };
      values.push(value);
    });
    return values;
  }

  convertAttribute(
    attributeName: string,
    values: Configurator.Value[]
  ): Configurator.Attribute {
    return {
      name: attributeName,
      values: values,
    };
  }
}

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

    source?.attributes?.forEach((attr) => {
      const uiKeys = attr?.csticUiKey.split('@');
      const attribute = this.convertAttribute(
        uiKeys.pop(),
        this.convertValue(attr?.priceSupplements)
      );

      const group: Configurator.Group = {
        id: uiKeys[0],
        subGroups: [],
        attributes: [],
      };
      if (uiKeys.length === 1) {
        group?.attributes.push(attribute);
      } else {
        for (let index = 1; index < uiKeys.length; index++) {
          const subGroup: Configurator.Group = {
            id: uiKeys[index],
            subGroups: [],
            attributes: [],
          };
          if (index === uiKeys.length - 1) {
            subGroup?.attributes.push(attribute);
          }

          if (group?.subGroups?.indexOf(subGroup) === -1) {
            group?.subGroups.push(subGroup);
          }
        }
      }
      if (resultTarget?.groups?.indexOf(group) === -1) {
        resultTarget?.groups?.push(group);
      }
    });

    return resultTarget;
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

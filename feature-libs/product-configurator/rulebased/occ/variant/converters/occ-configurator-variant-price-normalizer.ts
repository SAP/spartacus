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
      const attributeUIKey = attr?.csticUiKey.split('@');

      const priceSupplements = attr?.priceSupplements;
      let values: Configurator.Value[] = [];

      priceSupplements.forEach((obj) => {
        const value: Configurator.Value = {
          valueCode: obj?.attributeValueKey,
          valuePrice: obj?.priceValue,
        };
        values.push(value);
      });

      const attribute: Configurator.Attribute = {
        name: attributeUIKey[attributeUIKey?.length - 1],
        values: values,
      };
      //remove last element from array because it is the attribute name
      attributeUIKey.pop();

      for (let index = 0; index < attributeUIKey?.length; index++) {
        const group: Configurator.Group = {
          id: attributeUIKey[index],
          subGroups: [],
          attributes: [],
        };
        if (attributeUIKey.length > 1) {
          group?.attributes.push(attribute);
        } else {
          const subGroup: Configurator.Group = {
            id: attributeUIKey[index + 1],
            subGroups: [],
            attributes: [],
          };
          subGroup?.attributes.push(attribute);
          group.subGroups.push(subGroup);
        }
        resultTarget?.groups?.push(group);
      }
    });

    return resultTarget;
  }
}

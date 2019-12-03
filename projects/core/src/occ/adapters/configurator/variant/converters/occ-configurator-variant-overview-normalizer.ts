import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewNormalizer
  implements
    Converter<
      OccConfigurator.ConfigurationOverview,
      Configurator.ConfigurationOverview
    > {
  constructor() {}

  convert(
    source: OccConfigurator.ConfigurationOverview,
    target?: Configurator.ConfigurationOverview
  ): Configurator.Configuration {
    target = {
      configId: source.id,
      groups: [],
    };

    source.groups.forEach(group => {
      const targetGroup: Configurator.Group = {
        id: group.id,
        attributes: [],
      };

      group.characteristicValues.forEach(value => {
        targetGroup.attributes.push({
          name: value.characteristic,
          values: [
            {
              valueDisplay: value.value,
            },
          ],
        });
      });

      target.groups.push(targetGroup);
    });

    return target;
  }
}

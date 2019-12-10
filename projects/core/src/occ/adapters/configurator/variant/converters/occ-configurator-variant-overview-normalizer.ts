import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewNormalizer
  implements Converter<OccConfigurator.Overview, Configurator.Overview> {
  constructor() {}

  convert(
    source: OccConfigurator.Overview,
    target?: Configurator.Overview
  ): Configurator.Overview {
    target = {
      groups: source.groups.map(group => {
        return {
          id: group.id,
          groupDescription: group.groupDescription,
          attributes: group.characteristicValues.map(characteristic => {
            return {
              attribute: characteristic.characteristic,
              value: characteristic.value,
            };
          }),
        };
      }),
    };

    return target;
  }
}

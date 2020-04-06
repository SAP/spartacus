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
      groups: source.groups.flatMap((group) => this.convertGroup(group)),
    };

    return target;
  }

  convertGroup(
    source: OccConfigurator.GroupOverview
  ): Configurator.GroupOverview[] {
    const result: Configurator.GroupOverview[] = [];
    const characteristicValues: OccConfigurator.CharacteristicOverview[] =
      source.characteristicValues;
    const subGroups: OccConfigurator.GroupOverview[] = source.subGroups;

    result.push({
      id: source.id,
      groupDescription: source.groupDescription,
      attributes: characteristicValues
        ? characteristicValues.map((characteristic) => {
            return {
              attribute: characteristic.characteristic,
              value: characteristic.value,
            };
          })
        : [],
    });
    if (subGroups) {
      subGroups.forEach((subGroup) =>
        this.convertGroup(subGroup).forEach((groupArray) =>
          result.push(groupArray)
        )
      );
    }
    return result;
  }
}

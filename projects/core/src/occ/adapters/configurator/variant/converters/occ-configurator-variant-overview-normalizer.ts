import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { TranslationService } from '../../../../../i18n/translation.service';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewNormalizer
  implements Converter<OccConfigurator.Overview, Configurator.Overview> {
  constructor(protected translation: TranslationService) {}

  convert(
    source: OccConfigurator.Overview,
    target?: Configurator.Overview
  ): Configurator.Overview {
    target = {
      groups: source.groups.flatMap(group => this.convertGroup(group)),
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
        ? characteristicValues.map(characteristic => {
            return {
              attribute: characteristic.characteristic,
              value: characteristic.value,
            };
          })
        : [],
    });
    this.setGeneralDescription(result[0]);
    if (subGroups) {
      subGroups.forEach(subGroup =>
        this.convertGroup(subGroup).forEach(groupArray =>
          result.push(groupArray)
        )
      );
    }
    return result;
  }

  setGeneralDescription(group: Configurator.GroupOverview): void {
    if (group.id !== '_GEN') {
      return;
    }
    this.translation
      .translate('configurator.group.general')
      .pipe(take(1))
      .subscribe(generalText => (group.groupDescription = generalText));
  }
}

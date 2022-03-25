import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  TranslationService,
} from '@spartacus/core';
import { take } from 'rxjs/operators';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import { VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER } from './../variant-configurator-occ.converters';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewNormalizer
  implements Converter<OccConfigurator.Overview, Configurator.Overview>
{
  constructor(
    protected translation: TranslationService,
    protected converterService: ConverterService
  ) {}

  convert(
    source: OccConfigurator.Overview,
    target?: Configurator.Overview
  ): Configurator.Overview {
    const prices: OccConfigurator.Prices = {
      priceSummary: source.pricing,
      configId: source.id,
    };
    const resultTarget: Configurator.Overview = {
      ...target,
      configId: source.id,
      totalNumberOfIssues: source.totalNumberOfIssues,
      groups: source.groups?.flatMap((group) => this.convertGroup(group)),
      priceSummary: this.converterService.convert(
        prices,
        VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER
      ),
      productCode: source.productCode,
    };
    return resultTarget;
  }

  convertGroup(
    source: OccConfigurator.GroupOverview
  ): Configurator.GroupOverview[] {
    const result: Configurator.GroupOverview[] = [];
    const characteristicValues:
      | OccConfigurator.CharacteristicOverview[]
      | undefined = source.characteristicValues;
    const subGroups: OccConfigurator.GroupOverview[] | undefined =
      source.subGroups;
    const group: Configurator.GroupOverview = {
      id: source.id,
      groupDescription: source.groupDescription,
      attributes: characteristicValues
        ? characteristicValues.map((characteristic) => {
            return {
              attribute: characteristic.characteristic,
              attributeId: characteristic.characteristicId,
              value: characteristic.value,
              valueId: characteristic.valueId,
            };
          })
        : [],
    };

    this.setGeneralDescription(group);
    if (subGroups) {
      const resultSubGroups: Configurator.GroupOverview[] = [];
      subGroups.forEach((subGroup) =>
        this.convertGroup(subGroup).forEach((groupArray) =>
          resultSubGroups.push(groupArray)
        )
      );
      group.subGroups = resultSubGroups;
    }
    result.push(group);
    return result;
  }

  setGeneralDescription(group: Configurator.GroupOverview): void {
    if (group.id !== '_GEN') {
      return;
    }
    this.translation
      .translate('configurator.group.general')
      .pipe(take(1))
      .subscribe((generalText) => (group.groupDescription = generalText));
  }
}

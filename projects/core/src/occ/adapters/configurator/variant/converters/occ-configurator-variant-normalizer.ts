import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';
import { UiTypeFinderVariantService } from './ui-type-finder-variant.service';

@Injectable()
export class OccConfiguratorVariantNormalizer
  implements
    Converter<OccConfigurator.Configuration, Configurator.Configuration> {
  constructor(private uiTypeFinder: UiTypeFinderVariantService) {}

  convert(
    source: OccConfigurator.Configuration,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.complete = source.complete;
    target.attributes = [];

    source.groups.forEach(group => this.convertGroup(group, target.attributes));
    return target;
  }

  convertGroup(
    source: OccConfigurator.Group,
    attributeList: Configurator.Attribute[]
  ) {
    source.cstics.forEach(cstic =>
      this.convertCharacteristic(cstic, attributeList)
    );
  }

  convertCharacteristic(
    cstic: OccConfigurator.Characteristic,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      name: cstic.name,
      label: cstic.langdepname,
      required: cstic.required,
      uiType: this.uiTypeFinder.findUiTypeForOccConfiguratorVariantType(
        cstic.type
      ),
      values: [],
    };
    if (cstic.domainvalues) {
      cstic.domainvalues.forEach(value =>
        this.convertValue(value, attribute.values)
      );
    }
    attributeList.push(attribute);
  }

  convertValue(
    occValue: OccConfigurator.Value,
    values: Configurator.Value[]
  ): void {
    const value: Configurator.Value = {
      valueCode: occValue.key,
      valueDisplay: occValue.langdepname,
    };

    values.push(value);
  }
}

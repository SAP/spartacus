import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
export class OccConfiguratorVariantSerializer
  implements
    Converter<Configurator.Configuration, OccConfigurator.Configuration> {
  constructor() {}

  convert(
    source: Configurator.Configuration,
    target?: OccConfigurator.Configuration
  ): OccConfigurator.Configuration {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.complete = source.complete;
    target.groups = [];

    this.convertGroup(source.attributes, target.groups);

    return target;
  }

  convertGroup(
    source: Configurator.Attribute[],
    occGroups: OccConfigurator.Group[]
  ) {
    source.forEach(cstic => this.convertAttribute(cstic, occGroups[0].cstics));
  }

  convertAttribute(
    cstic: Configurator.Attribute,
    occCstics: OccConfigurator.Characteristic[]
  ): void {
    const attribute: OccConfigurator.Characteristic = {
      name: cstic.name,
      langdepname: cstic.label,
      required: cstic.required,
      type: this.convertCharacteristicType(cstic.uiType),
      domainvalues: [],
    };
    if (cstic.values) {
      cstic.values.forEach(value =>
        this.convertValue(value, attribute.domainvalues)
      );
    }

    occCstics.push(attribute);
  }

  convertValue(
    value: Configurator.Value,
    occValues: OccConfigurator.Value[]
  ): void {
    const occValue: OccConfigurator.Value = {
      key: value.valueCode,
      selected: value.selected,
    };

    occValues.push(occValue);
  }

  convertCharacteristicType(type: Configurator.UiType): OccConfigurator.UiType {
    let uiType: OccConfigurator.UiType;
    switch (type) {
      case Configurator.UiType.RADIOBUTTON: {
        uiType = OccConfigurator.UiType.RADIO_BUTTON;
        break;
      }
      default: {
        uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }
}

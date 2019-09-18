import { Injectable } from '@angular/core';
import {
  Attribute,
  Configuration,
  Value,
} from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
export class OccConfiguratorVariantNormalizer
  implements Converter<OccConfigurator.Configuration, Configuration> {
  constructor() {}

  convert(
    source: OccConfigurator.Configuration,
    target?: Configuration
  ): Configuration {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.complete = source.complete;
    target.attributes = [];

    source.groups.forEach(group => this.convertGroup(group, target.attributes));
    return target;
  }

  convertGroup(source: OccConfigurator.Group, attributeList: Attribute[]) {
    source.cstics.forEach(cstic =>
      this.convertCharacteristic(cstic, attributeList)
    );
  }

  convertCharacteristic(
    cstic: OccConfigurator.Characteristic,
    attributeList: Attribute[]
  ): void {
    const attribute: Attribute = {
      name: cstic.name,
      label: cstic.langdepname,
      values: [],
    };
    if (cstic.domainvalues) {
      cstic.domainvalues.forEach(value =>
        this.convertValue(value, attribute.values)
      );
    }
    attributeList.push(attribute);
  }

  convertValue(occValue: OccConfigurator.Value, values: Value[]): void {
    const value: Value = {
      valueCode: occValue.key,
      valueDisplay: occValue.langdepname,
    };

    values.push(value);
  }
}

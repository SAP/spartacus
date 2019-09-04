import { Injectable } from '@angular/core';
import {
  Attribute,
  ProductConfiguration,
} from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable()
export class OccConfiguratorVariantNormalizer
  implements Converter<OccConfigurator.Configuration, ProductConfiguration> {
  constructor() {}

  convert(
    source: OccConfigurator.Configuration,
    target?: ProductConfiguration
  ): ProductConfiguration {
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
    };

    attributeList.push(attribute);
  }
}

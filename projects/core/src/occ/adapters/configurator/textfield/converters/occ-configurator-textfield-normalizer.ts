import { Injectable } from '@angular/core';
import { ConfiguratorTextfield } from '../../../../../model/configurator-textfield.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorTextfieldNormalizer
  implements
    Converter<
      OccConfiguratorTextfield.Configuration,
      ConfiguratorTextfield.Configuration
    > {
  constructor() {}

  convert(
    source: OccConfiguratorTextfield.Configuration,
    target?: ConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    const resultTarget: ConfiguratorTextfield.Configuration = {
      ...target,
      ...(source as any),
    };

    return resultTarget;
  }
}

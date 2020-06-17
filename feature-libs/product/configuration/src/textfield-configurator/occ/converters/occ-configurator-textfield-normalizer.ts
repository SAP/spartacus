import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';
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
    target = { ...(source as any) };

    return target;
  }
}

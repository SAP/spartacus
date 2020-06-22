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
  /**
   * Converts addToCart parameters into the generic format
   * @param source Add to cart parameters in OCC format
   * @returns Add to cart parameters in generic format
   */
  convert(
    source: OccConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    const target = { ...(source as any) };
    return target;
  }
}

import { Injectable } from '@angular/core';
import { Configurator } from '../../../../../model/configurator.model';
import { Converter } from '../../../../../util/converter.service';
import { OccConfigurator } from '../occ-configurator.models';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantOverviewNormalizer
  implements Converter<OccConfigurator.Overview, Configurator.Configuration> {
  constructor() {}

  convert(
    source: OccConfigurator.Overview,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    target = {
      configId: source.id,
      overview: source,
    };

    return target;
  }
}

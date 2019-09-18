import { InjectionToken } from '@angular/core';
import { Configuration } from '../../../model/configurator.model';
import { Converter } from '../../../util/converter.service';

export const CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, Configuration>
>('ConfigurationNormalizer');

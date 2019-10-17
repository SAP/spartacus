import { InjectionToken } from '@angular/core';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import { Converter } from '../../../util/converter.service';

export const CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, ConfiguratorTextfield.Configuration>
>('ConfigurationNormalizer');

export const CONFIGURATION_SERIALIZER = new InjectionToken<
  Converter<ConfiguratorTextfield.Configuration, any>
>('ConfigurationSerializer');

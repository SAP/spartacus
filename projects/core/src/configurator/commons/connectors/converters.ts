import { InjectionToken } from '@angular/core';
import { Configurator } from '../../../model/configurator.model';
import { Converter } from '../../../util/converter.service';

export const CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, Configurator.Configuration>
>('ConfigurationNormalizer');

export const CONFIGURATION_SERIALIZER = new InjectionToken<
  Converter<Configurator.Configuration, any>
>('ConfigurationSerializer');

export const CONFIGURATION_PRICE_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<any, Configurator.Configuration>
>('ConfigurationPriceSummaryNormalizer');

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '../model/configurator.model';
import { RulebasedConfiguratorAdapter } from './rulebased-configurator.adapter';

export const CONFIGURATOR_ADAPTER_LIST = new InjectionToken<
  RulebasedConfiguratorAdapter
>('ConfiguratorAdapterList');

export const CONFIGURATION_NORMALIZER = new InjectionToken<
  Converter<any, Configurator.Configuration>
>('ConfigurationNormalizer');

export const CONFIGURATION_SERIALIZER = new InjectionToken<
  Converter<Configurator.Configuration, any>
>('ConfigurationSerializer');

export const CONFIGURATION_PRICE_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<any, Configurator.PriceSummary>
>('ConfigurationPriceSummaryNormalizer');

export const CONFIGURATION_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<Configurator.AddToCartParameters, any>
>('ConfigurationAddToCartSerializer');

export const CONFIGURATION_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken<
  Converter<Configurator.UpdateConfigurationForCartEntryParameters, any>
>('ConfigurationUpdateCartEntrySerializer');

export const CONFIGURATION_OVERVIEW_NORMALIZER = new InjectionToken<
  Converter<any, Configurator.Overview>
>('ConfigurationOverviewNormalizer');

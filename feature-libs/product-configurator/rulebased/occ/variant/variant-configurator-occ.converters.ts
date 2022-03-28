import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { OccConfigurator } from './variant-configurator-occ.models';

export const VARIANT_CONFIGURATOR_NORMALIZER = new InjectionToken<
  Converter<OccConfigurator.Configuration, Configurator.Configuration>
>('VariantConfiguratorNormalizer');

export const VARIANT_CONFIGURATOR_SERIALIZER = new InjectionToken<
  Converter<Configurator.Configuration, OccConfigurator.Configuration>
>('VariantConfiguratorSerializer');

export const VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER = new InjectionToken<
  Converter<OccConfigurator.PriceSummary, Configurator.PriceSummary>
>('VariantConfiguratorPriceSummaryNormalizer');

export const VARIANT_CONFIGURATOR_PRICE_NORMALIZER = new InjectionToken<
  Converter<OccConfigurator.PriceSummary, Configurator.Configuration>
>('VariantConfiguratorPriceNormalizer');

export const VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccConfigurator.AddToCartParameters
  >
>('VariantConfiguratorAddToCartSerializer');

export const VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER =
  new InjectionToken<
    Converter<
      Configurator.UpdateConfigurationForCartEntryParameters,
      OccConfigurator.UpdateConfigurationForCartEntryParameters
    >
  >('VariantConfiguratorUpdateCartEntrySerializer');

export const VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER = new InjectionToken<
  Converter<OccConfigurator.Overview, Configurator.Overview>
>('VariantConfiguratorOverviewNormalizer');

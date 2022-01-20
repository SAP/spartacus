import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';

export const CONFIGURATION_TEXTFIELD_NORMALIZER = new InjectionToken<
  Converter<any, ConfiguratorTextfield.Configuration>
>('ConfigurationNormalizer');

export const CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER =
  new InjectionToken<Converter<ConfiguratorTextfield.AddToCartParameters, any>>(
    'ConfigurationAddToCartSerializer'
  );

export const CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER =
  new InjectionToken<
    Converter<ConfiguratorTextfield.UpdateCartEntryParameters, any>
  >('ConfigurationUpdateCartEntrySerializer');

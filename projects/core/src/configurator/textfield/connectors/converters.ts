import { InjectionToken } from '@angular/core';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import { Converter } from '../../../util/converter.service';

export const CONFIGURATION_TEXTFIELD_NORMALIZER = new InjectionToken<
  Converter<any, ConfiguratorTextfield.Configuration>
>('ConfigurationNormalizer');

export const CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<ConfiguratorTextfield.AddToCartParameters, any>
>('ConfigurationAddToCartSerializer');

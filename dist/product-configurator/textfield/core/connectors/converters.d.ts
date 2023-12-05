import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../model/configurator-textfield.model';
export declare const CONFIGURATION_TEXTFIELD_NORMALIZER: InjectionToken<Converter<any, ConfiguratorTextfield.Configuration>>;
export declare const CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER: InjectionToken<Converter<ConfiguratorTextfield.AddToCartParameters, any>>;
export declare const CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER: InjectionToken<Converter<ConfiguratorTextfield.UpdateCartEntryParameters, any>>;

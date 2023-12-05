import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';
export declare const CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER: InjectionToken<Converter<Configurator.AddToCartParameters, OccCpqConfigurator.AddToCartParameters>>;
export declare const CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER: InjectionToken<Converter<Configurator.AddToCartParameters, OccCpqConfigurator.UpdateConfigurationForCartEntryParameters>>;

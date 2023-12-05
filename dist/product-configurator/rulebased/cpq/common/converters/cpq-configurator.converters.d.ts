import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
export declare const CPQ_CONFIGURATOR_NORMALIZER: InjectionToken<Converter<Cpq.Configuration, Configurator.Configuration>>;
export declare const CPQ_CONFIGURATOR_SERIALIZER: InjectionToken<Converter<Configurator.Configuration, Cpq.UpdateAttribute>>;
export declare const CPQ_CONFIGURATOR_QUANTITY_SERIALIZER: InjectionToken<Converter<Configurator.Configuration, Cpq.UpdateValue>>;
export declare const CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER: InjectionToken<Converter<Cpq.Configuration, Configurator.Overview>>;

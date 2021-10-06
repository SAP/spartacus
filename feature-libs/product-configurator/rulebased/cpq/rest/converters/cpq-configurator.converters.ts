import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';

export const CPQ_CONFIGURATOR_NORMALIZER = new InjectionToken<
  Converter<Cpq.Configuration, Configurator.Configuration>
>('CpqConfiguratorNormalizer');

export const CPQ_CONFIGURATOR_SERIALIZER = new InjectionToken<
  Converter<Configurator.Configuration, Cpq.UpdateAttribute>
>('CpqConfiguratorSerializer');

export const CPQ_CONFIGURATOR_QUANTITY_SERIALIZER = new InjectionToken<
  Converter<Configurator.Configuration, Cpq.UpdateValue>
>('CpqConfiguratorValueSerializer');

export const CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER = new InjectionToken<
  Converter<Cpq.Configuration, Configurator.Overview>
>('CpqConfiguratorOverviewNormalizer');

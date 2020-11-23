import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '../core/model/configurator.model';
import { Cpq } from './cpq.models';

export const CPQ_CONFIGURATOR_NORMALIZER = new InjectionToken<
  Converter<Cpq.Configuration, Configurator.Configuration>
>('CpqConfiguratorNormalizer');

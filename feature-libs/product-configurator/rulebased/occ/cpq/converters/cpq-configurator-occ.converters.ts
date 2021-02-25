import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

export const CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccCpqConfigurator.AddToCartParameters
  >
>('CpqConfiguratorAddToCartSerializer');

export const CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccCpqConfigurator.UpdateConfigurationForCartEntryParameters
  >
>('CpqConfiguratorUpdateCartEntrySerializer');

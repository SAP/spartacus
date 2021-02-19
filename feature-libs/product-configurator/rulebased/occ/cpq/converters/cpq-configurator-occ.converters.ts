import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';

export const CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken<
  Converter<
    Configurator.AddToCartParameters,
    OccCpqConfigurator.AddToCartParameters
  >
>('CpqConfiguratorAddToCartSerializer');

import { InjectionToken } from '@angular/core';
import { Converter, Product } from '@spartacus/core';
import { MerchandisingProduct } from './../../model/strategy.result';

export const MERCHANDISING_PRODUCT_CONVERTER = new InjectionToken<
  Converter<MerchandisingProduct, Product>
>('MerchandisingProductConverter');

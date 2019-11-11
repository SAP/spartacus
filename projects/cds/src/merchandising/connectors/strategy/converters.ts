import { InjectionToken } from '@angular/core';
import { Converter, Product } from '@spartacus/core';
import { MerchandisingProducts } from '../../model/merchandising.products.model';
import {
  MerchandisingProduct,
  StrategyResult,
} from './../../model/strategy.result';

export const MERCHANDISING_PRODUCTS_NORMALIZER = new InjectionToken<
  Converter<StrategyResult, MerchandisingProducts>
>('MerchandisingProductsNormalizer');

export const MERCHANDISING_PRODUCT_NORMALIZER = new InjectionToken<
  Converter<MerchandisingProduct, Product>
>('MerchandisingProductNormalizer');

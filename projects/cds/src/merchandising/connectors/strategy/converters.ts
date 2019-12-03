import { InjectionToken } from '@angular/core';
import { Breadcrumb, Converter } from '@spartacus/core';
import { MerchandisingFacet } from '../../model/merchandising-facet.model';
import {
  MerchandisingProduct,
  MerchandisingProducts,
} from '../../model/merchandising-products.model';
import {
  StrategyProduct,
  StrategyResult,
} from '../../model/strategy-result.model';

export const MERCHANDISING_PRODUCTS_NORMALIZER = new InjectionToken<
  Converter<StrategyResult, MerchandisingProducts>
>('MerchandisingProductsNormalizer');

export const STRATEGY_PRODUCT_NORMALIZER = new InjectionToken<
  Converter<StrategyProduct, MerchandisingProduct>
>('StrategyProductNormalizer');

export const MERCHANDISING_FACET_NORMALIZER = new InjectionToken<
  Converter<Breadcrumb[], MerchandisingFacet[]>
>('MerchandisingFacetNormalizer');

export const MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER = new InjectionToken<
  Converter<MerchandisingFacet[], string>
>('MerchandisingFacetToQueryparamNormalizer');

import { InjectionToken } from '@angular/core';
import { Breadcrumb, Converter } from '@spartacus/core';
import { MerchandisingFacet } from '../../model/merchandising-facet.model';
import { MerchandisingProducts } from '../../model/merchandising-products.model';
import { StrategyProducts } from '../../model/strategy-products.model';

export const MERCHANDISING_PRODUCTS_NORMALIZER = new InjectionToken<
  Converter<StrategyProducts, MerchandisingProducts>
>('MerchandisingProductsNormalizer');

export const MERCHANDISING_FACET_NORMALIZER = new InjectionToken<
  Converter<Breadcrumb[], MerchandisingFacet[]>
>('MerchandisingFacetNormalizer');

export const MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER = new InjectionToken<
  Converter<MerchandisingFacet[], string>
>('MerchandisingFacetToQueryparamNormalizer');

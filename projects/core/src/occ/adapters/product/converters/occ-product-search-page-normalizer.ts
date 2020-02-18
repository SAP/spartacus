import { Injectable } from '@angular/core';
import {
  Facet,
  ProductSearchPage,
} from '../../../../model/product-search.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class OccProductSearchPageNormalizer
  implements Converter<Occ.ProductSearchPage, ProductSearchPage> {
  constructor(private converterService: ConverterService) {}

  /**
   * Specifies the minimal number of top values in case
   * non have been setup by the business.
   */
  protected DEFAULT_TOP_VALUES = 6;

  convert(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };
    this.normalizeFacetValues(source, target);
    if (source.products) {
      target.products = source.products.map(product =>
        this.converterService.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }

  /**
   *
   * In case there are so-called `topValues` given for the facet values,
   * we replace the facet values by the topValues, simply because the
   * values are obsolete.
   *
   * `topValues` is a feature in Adaptive Search which can limit a large
   * amount of facet values to a small set (5 by default). As long as the backend
   * provides all facet values AND topValues, we normalize the data to not bother
   * the UI with this specific feature.
   */
  private normalizeFacetValues(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage
  ): void {
    if (target.facets) {
      target.facets = source.facets.map((facetSource: Facet) => {
        const { topValues, ...facetTarget } = facetSource;
        facetTarget.topValueCount = topValues
          ? topValues.length
          : this.DEFAULT_TOP_VALUES;
        return facetTarget;
      });
    }
  }
}

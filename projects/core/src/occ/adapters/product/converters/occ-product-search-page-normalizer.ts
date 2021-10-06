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
  implements Converter<Occ.ProductSearchPage, ProductSearchPage>
{
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

    this.normalizeFacets(target);
    if (source.products) {
      target.products = source.products.map((product) =>
        this.converterService.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }

  private normalizeFacets(target: ProductSearchPage): void {
    this.normalizeFacetValues(target);
    this.normalizeUselessFacets(target);
  }

  /**
   * The (current) backend returns facets with values that do not contribute
   * to the facet navigation much, as the number in the result list will not get
   * behavior, see https://jira.hybris.com/browse/CS-427.
   *
   * As long as this is not in place, we manually filter the facet from the list;
   * any facet that does not have a count < the total results will be dropped from
   * the facets.
   */
  private normalizeUselessFacets(target: ProductSearchPage): void {
    if (target.facets) {
      target.facets = target.facets.filter((facet) => {
        return (
          !target.pagination ||
          !target.pagination.totalResults ||
          ((!facet.hasOwnProperty('visible') || facet.visible) &&
            facet.values &&
            facet.values.find((value) => {
              return (
                value.selected || value.count < target.pagination.totalResults
              );
            }))
        );
      });
    }
  }

  /*
   * In case there are so-called `topValues` given for the facet values,
   * values are obsolete.
   *
   * `topValues` is a feature in Adaptive Search which can limit a large
   * amount of facet values to a small set (5 by default). As long as the backend
   * provides all facet values AND topValues, we normalize the data to not bother
   * the UI with this specific feature.
   */
  private normalizeFacetValues(target: ProductSearchPage): void {
    if (target.facets) {
      target.facets = target.facets.map((facetSource: Facet) => {
        const { topValues, ...facetTarget } = facetSource;
        facetTarget.topValueCount =
          topValues?.length > 0 ? topValues.length : this.DEFAULT_TOP_VALUES;
        return facetTarget;
      });
    }
  }
}

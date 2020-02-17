import { Injectable } from '@angular/core';
import { ProductSearchPage } from '../../../../model/product-search.model';
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

  convert(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };
    this.normalizeUselessFacets(target);
    if (source.products) {
      target.products = source.products.map(product =>
        this.converterService.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }

  /**
   * The (current) backend returns facets with values that do not contribute
   * to the facet navigation much, as the number in the result list will not get
   * affected when they got applied. A ticket has been created to fix this
   * behaviour, see https://jira.hybris.com/browse/CS-427.
   *
   * As long as this is not in place, we manually filter the facet from the list;
   * any facet that does not have a count < the total results will be dropped from
   * the facets.
   */
  private normalizeUselessFacets(target: ProductSearchPage): void {
    target.facets = [].concat(
      target.facets.filter(facet => {
        return (
          !target.pagination ||
          !target.pagination.totalResults ||
          ((!facet.hasOwnProperty('visible') || facet.visible) &&
            facet.values &&
            facet.values.find(value => {
              return (
                value.selected || value.count < target.pagination.totalResults
              );
            }))
        );
      })
    );
  }
}

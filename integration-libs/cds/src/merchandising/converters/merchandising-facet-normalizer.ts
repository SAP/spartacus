import { Injectable } from '@angular/core';
import { Breadcrumb, Converter } from '@spartacus/core';
import { MerchandisingFacet } from '../model/merchandising-facet.model';

@Injectable({ providedIn: 'root' })
export class MerchandisingFacetNormalizer
  implements Converter<Breadcrumb[], MerchandisingFacet[]>
{
  convert(
    source: Breadcrumb[],
    target: MerchandisingFacet[] = []
  ): MerchandisingFacet[] {
    if (source) {
      source.forEach((breadcrumb) => {
        target.push({
          code: breadcrumb.facetCode,
          value: breadcrumb.facetValueCode,
        });
      });
    }

    return target;
  }
}

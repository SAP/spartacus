import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { MerchandisingFacet } from './../model/merchandising-facet';

@Injectable({ providedIn: 'root' })
export class MerchandisingFacetToQueryparamNormalizer
  implements Converter<MerchandisingFacet[], string> {
  convert(source: MerchandisingFacet[], target?: string): string {
    target = source
      .filter(Boolean)
      .filter((facet: MerchandisingFacet) => facet.code && facet.value)
      .map(facet => `${facet.code}:${facet.value}`)
      .join(':');
    return target.length > 0 ? target : undefined;
  }
}

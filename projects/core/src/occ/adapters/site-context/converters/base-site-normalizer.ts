import { Injectable } from '@angular/core';
import { BaseSite } from '../../../../model/misc.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({ providedIn: 'root' })
export class BaseSiteNormalizer implements Converter<Occ.BaseSite, BaseSite> {
  constructor() {}

  convert(source: Occ.BaseSite, target?: BaseSite): BaseSite {
    if (target === undefined) {
      target = { ...(source as any) } as BaseSite;
    }

    // We take the first store as the base store.
    target.baseStore = source.stores?.[0];
    delete target.stores;

    return target;
  }
}

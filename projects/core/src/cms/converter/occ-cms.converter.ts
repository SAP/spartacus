import { Injectable, Inject } from '@angular/core';
import { Populator } from './populator';
import { CMSPage } from '../../occ/occ-models/occ.models';

@Injectable()
export class OccCmsConvertor {
  constructor(@Inject(Populator) private populators: Populator[]) {}

  convert(page: CMSPage): CMSPage {
    this.populators.forEach(p => p.populate(page));
    return page;
  }
}

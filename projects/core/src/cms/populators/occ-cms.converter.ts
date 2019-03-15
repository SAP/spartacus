import { Injectable, Inject } from '@angular/core';
import { Populator } from './populator';
import { CMSPage } from '../../occ/occ-models/occ.models';

@Injectable()
export class OccCmsConvertor {
  constructor(@Inject(Populator) private populators: Populator[]) {}

  convert(page: CMSPage): CMSPage {
    console.log('page before', page);
    this.populators.forEach(p => p.populate(page));
    console.log('page after', page);
    return page;
  }
}

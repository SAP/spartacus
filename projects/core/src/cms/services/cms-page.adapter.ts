import { Injectable } from '@angular/core';
import { CmsStructureModel } from '../model/page.model';

@Injectable()
export abstract class CmsPageAdapter<S> {
  abstract adapt(source: S): CmsStructureModel;
}

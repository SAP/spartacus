import { Injectable } from '@angular/core';
import { CmsModuleConfig } from '../model/cms-config';
import { PageType } from '../../occ-models';

@Injectable()
export class DefaultPageService {
  constructor(private config: CmsModuleConfig) {}

  getDefaultPageIdsBytype(type: PageType): string[] {
    return this.config.defaultPageIdForType[type];
  }
}

import { Injectable } from '@angular/core';
import { CmsConfig } from '../config/cms-config';
import { PageType } from '../../occ/occ-models';

@Injectable()
export class DefaultPageService {
  constructor(private config: CmsConfig) {}

  getDefaultPageIdsBytype(type: PageType): string[] {
    return this.config.defaultPageIdForType[type];
  }
}

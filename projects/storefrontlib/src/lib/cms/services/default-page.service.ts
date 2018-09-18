import { Injectable } from '@angular/core';
import { CmsModuleConfig } from '../cms-module-config';
import { PageType } from '../../routing/models/page-context.model';

@Injectable()
export class DefaultPageService {
  constructor(private config: CmsModuleConfig) {}

  getDefaultPageIdsBytype(type: PageType): string[] {
    return this.config.defaultPageIdForType[type];
  }
}

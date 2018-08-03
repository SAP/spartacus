import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { PageType } from '../../routing/models/page-context.model';

@Injectable()
export class DefaultPageService {
  constructor(private config: ConfigService) {}

  getDefaultPageIdsBytype(type: PageType): string[] {
    return this.config.defaultPageIdForType[type];
  }
}

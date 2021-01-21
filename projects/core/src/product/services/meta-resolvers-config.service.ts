import { Injectable } from '@angular/core';
import { MetaResolversConfig } from '../config/meta-resolvers-config';

@Injectable({
  providedIn: 'root',
})
export class MetaResolversConfigService {
  constructor(protected config: MetaResolversConfig) {}

  get categoryPage(): any {
    return this.config?.categoryPageMetaResolver;
  }
}

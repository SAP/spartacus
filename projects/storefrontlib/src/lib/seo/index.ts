import { Injector } from '@angular/core';
import { SeoTitleService } from './seo-title.service';

export * from './seo-title.service';

export function initSeoService(injector: Injector) {
  return function() {
    const service = injector.get(SeoTitleService);
    service.initPageTitle();
  };
}

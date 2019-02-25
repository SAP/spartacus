import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { SeoTitleService } from './seo-title.service';

export function initSeoService(injector: Injector) {
  return function() {
    const service = injector.get(SeoTitleService);
    service.initPageTitle();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initSeoService,
      deps: [Injector],
      multi: true
    }
  ]
})
export class SeoModule {}

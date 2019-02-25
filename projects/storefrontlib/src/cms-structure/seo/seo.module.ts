import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { SeoTitleService } from './seo-title.service';

export function initSeoService(injector: Injector) {
  const result = () => {
    const service = injector.get(SeoTitleService);
    service.initPageTitle();
  };
  return result;
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

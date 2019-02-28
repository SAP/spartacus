import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { SeoMetaService } from './seo-meta.service';

export function initSeoService(injector: Injector) {
  const result = () => {
    const service = injector.get(SeoMetaService);
    service.init();
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

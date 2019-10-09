import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { htmlLangProvider } from './html-lang-provider';
import { SeoMetaService } from './seo-meta.service';
import { JsonLdDirective } from './structured-data/json-ld.directive';
// import { JsonLdComponent, SchemaComponent } from './structured-data/index';
import { StructuredDataModule } from './structured-data/structured-data.module';

export function initSeoService(injector: Injector) {
  const result = () => {
    const service = injector.get(SeoMetaService);
    service.init();
  };
  return result;
}

@NgModule({
  imports: [StructuredDataModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initSeoService,
      deps: [Injector],
      multi: true,
    },
    htmlLangProvider,
  ],
  exports: [JsonLdDirective],
})
export class SeoModule {}

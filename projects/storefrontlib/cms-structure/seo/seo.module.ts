import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSeoConfig } from './config';
import { htmlLangProvider } from './html-lang-provider';
import { SeoMetaService } from './seo-meta.service';
import { StructuredDataModule } from './structured-data/structured-data.module';

export function initSeoService(injector: Injector): () => void {
  const result = () => {
    const service = injector.get(SeoMetaService);
    service.init();
  };
  return result;
}

@NgModule({
  imports: [StructuredDataModule],
  providers: [
    provideDefaultConfig(defaultSeoConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: initSeoService,
      deps: [Injector],
      multi: true,
    },
    htmlLangProvider,
  ],
})
export class SeoModule {}

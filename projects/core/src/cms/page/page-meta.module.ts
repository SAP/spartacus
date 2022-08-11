import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../config/config-providers';
import { defaultPageMetaConfig } from './config/default-page-meta.config';
import { ContentPageMetaResolver } from './content-page-meta.resolver';
import { PageMetaResolver } from './page-meta.resolver';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: ContentPageMetaResolver,
      multi: true,
    },
  ],
})
export class PageMetaModule {
  static forRoot(): ModuleWithProviders<PageMetaModule> {
    return {
      ngModule: PageMetaModule,
      providers: [provideDefaultConfig(defaultPageMetaConfig)],
    };
  }
}

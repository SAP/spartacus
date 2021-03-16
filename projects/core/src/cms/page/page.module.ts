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

// TODO(#10467): Consider renaming to CmsPageModule or PageModule
export class CmsPageTitleModule {
  static forRoot(): ModuleWithProviders<CmsPageTitleModule> {
    return {
      ngModule: CmsPageTitleModule,
      providers: [provideDefaultConfig(defaultPageMetaConfig)],
    };
  }
}

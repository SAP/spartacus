import { NgModule } from '@angular/core';
import { PageMetaResolver } from './page-meta.resolver';
import { ContentPageTitleResolver } from './content-page-title.resolver';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: ContentPageTitleResolver,
      multi: true
    }
  ]
})
export class CmsPageTitleModule {}

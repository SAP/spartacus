import { NgModule } from '@angular/core';

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
export class CmsPageTitleModule {}

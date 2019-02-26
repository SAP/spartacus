import { NgModule } from '@angular/core';
import { PageTitleResolver } from './page-title.resolver';
import { ContentPageTitleResolver } from './content-page-title.resolver';

@NgModule({
  providers: [
    {
      provide: PageTitleResolver,
      useExisting: ContentPageTitleResolver,
      multi: true
    }
  ]
})
export class CmsPageTitleModule {}

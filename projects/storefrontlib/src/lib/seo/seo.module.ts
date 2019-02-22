import { NgModule } from '@angular/core';
// import { SeoTitleService } from './seo-title.service';
import { CmsPageTitleModule } from '@spartacus/core';
// import { Title } from '@angular/platform-browser';

// export function initSeo(seoTitleService: SeoTitleService) {
//   return () => {
//     seoTitleService.init();
//   };
// }

@NgModule({
  imports: [CmsPageTitleModule],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initSeo,
    //   multi: true,
    //   deps: [SeoTitleService, PageTitleService, Title]
    // }
  ]
})
export class SeoModule {}

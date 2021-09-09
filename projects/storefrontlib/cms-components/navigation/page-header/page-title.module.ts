import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  PageMetaModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { PageTitleComponent } from './page-title.component';

@NgModule({
  imports: [CommonModule, RouterModule, PageMetaModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PageTitleComponent: {
          component: PageTitleComponent,
        },
      },
    }),
  ],
  declarations: [PageTitleComponent],
  exports: [PageTitleComponent],
  entryComponents: [PageTitleComponent],
})
export class PageTitleModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  CmsPageTitleModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [CommonModule, RouterModule, CmsPageTitleModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        PageHeaderComponent: {
          component: PageHeaderComponent,
        },
      },
    }),
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
  entryComponents: [PageHeaderComponent],
})
export class PageHeaderModule {}

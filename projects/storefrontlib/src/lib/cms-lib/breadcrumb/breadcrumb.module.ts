import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModule, CmsConfig, CmsPageTitleModule } from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: { selector: 'cx-breadcrumb' }
      }
    }),
    CmsPageTitleModule
  ],
  declarations: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent]
})
export class BreadcrumbModule {}

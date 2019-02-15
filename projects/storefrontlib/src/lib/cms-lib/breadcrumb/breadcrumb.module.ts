import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigModule, PageTitleModule, CmsConfig } from '@spartacus/core';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PageTitleModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: { selector: 'cx-breadcrumb' }
      }
    })
  ],
  declarations: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent]
})
export class BreadcrumbModule {}

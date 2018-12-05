import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsModuleConfig>{
      cmsComponents: {
        BreadcrumbComponent: { selector: 'cx-breadcrumb' }
      }
    })
  ],
  declarations: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}

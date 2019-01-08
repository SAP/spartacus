import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ConfigModule } from '@spartacus/core';
import { CmsModuleConfig } from '../../cms/cms-module-config';

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
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BreadcrumbModule {}

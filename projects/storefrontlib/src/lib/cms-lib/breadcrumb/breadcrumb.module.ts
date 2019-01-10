import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ConfigModule } from '@spartacus/core';
import { CmsConfig } from '@spartacus/core';
import { CMSComponentDataImpl } from '../../cms/components/cms-component-data-impl';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        BreadcrumbComponent: { selector: 'cx-breadcrumb' }
      }
    })
  ],
  declarations: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent],
  providers: [CMSComponentDataImpl],
  exports: [BreadcrumbComponent],

})
export class BreadcrumbModule { }

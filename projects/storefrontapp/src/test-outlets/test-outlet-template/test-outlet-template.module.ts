import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  CmsPageGuard,
  OutletRefModule,
  PageLayoutModule,
} from '@spartacus/storefront';

import { TestOutletTemplateComponent } from './test-outlet-template.component';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild([
      {
        path: 'test/outlet/template',
        component: TestOutletTemplateComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  declarations: [TestOutletTemplateComponent],
})
export class TestOutletTemplateModule {}

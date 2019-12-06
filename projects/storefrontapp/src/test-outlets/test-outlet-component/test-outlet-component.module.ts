import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  PageLayoutModule,
  OutletRefModule,
  CmsPageGuard,
} from '@spartacus/storefront';

import { TestOutletComponentComponent } from './test-outlet-component.component';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild([
      {
        path: 'test/outlet/component',
        component: TestOutletComponentComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  declarations: [TestOutletComponentComponent],
})
export class TestOutletComponentModule {}

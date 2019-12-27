import { NgModule } from '@angular/core';
import {
  PageLayoutModule,
  OutletRefModule,
  CmsPageGuard,
} from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { TestOutletSlotComponent } from './test-outlet-slot.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild([
      {
        path: 'test/outlet/slot',
        component: TestOutletSlotComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  declarations: [TestOutletSlotComponent],
})
export class TestOutletSlotModule {}

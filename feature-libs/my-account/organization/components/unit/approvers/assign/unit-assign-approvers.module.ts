import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAssignApproversComponent } from './unit-assign-approvers.component';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    SplitViewModule,
    IconModule,
    I18nModule,
    TableModule,
    OutletRefModule,
    PaginationModule,
  ],
  declarations: [UnitAssignApproversComponent],
  exports: [UnitAssignApproversComponent],
  providers: [],
  entryComponents: [UnitAssignApproversComponent],
})
export class UnitAssignApproversModule {}

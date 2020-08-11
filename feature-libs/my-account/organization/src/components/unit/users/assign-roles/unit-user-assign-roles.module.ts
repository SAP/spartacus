import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { UnitUserAssignRolesComponent } from './unit-user-assign-roles.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    TableModule,
    NgSelectModule,
    FormsModule,
    SplitViewModule,
    RouterModule,
    OutletRefModule,
    IconModule,
    PaginationModule,
  ],
  declarations: [UnitUserAssignRolesComponent],
  exports: [UnitUserAssignRolesComponent],
  providers: [],
  entryComponents: [UnitUserAssignRolesComponent],
})
export class UnitUserAssignRolesModule {}

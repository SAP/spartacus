import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAssignRolesComponent } from './unit-assign-roles.component';
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
  declarations: [UnitAssignRolesComponent],
  exports: [UnitAssignRolesComponent],
  providers: [],
  entryComponents: [UnitAssignRolesComponent],
})
export class UnitAssignRolesModule {}

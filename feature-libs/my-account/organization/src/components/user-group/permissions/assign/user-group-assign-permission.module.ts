import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
  PaginationModule,
} from '@spartacus/storefront';
import { UserGroupAssignPermissionsComponent } from './user-group-assign-permission.component';

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
  declarations: [UserGroupAssignPermissionsComponent],
  exports: [UserGroupAssignPermissionsComponent],
})
export class UserGroupAssignPermissionModule {}

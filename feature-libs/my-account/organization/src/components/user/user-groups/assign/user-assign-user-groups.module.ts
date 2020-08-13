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
import { UserAssignUserGroupsComponent } from './user-assign-user-groups.component';

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
  declarations: [UserAssignUserGroupsComponent],
  exports: [UserAssignUserGroupsComponent],
})
export class UserAssignUserGroupsModule {}

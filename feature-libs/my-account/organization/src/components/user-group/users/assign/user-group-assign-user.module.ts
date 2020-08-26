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
import { UserGroupAssignUsersComponent } from './user-group-assign-user.component';

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
  declarations: [UserGroupAssignUsersComponent],
  exports: [UserGroupAssignUsersComponent],
})
export class UserGroupAssignUserModule {}

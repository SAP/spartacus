import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  TableModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { UserUserGroupListComponent } from './user-user-group-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    SplitViewModule,
    I18nModule,
    RouterModule,
    OutletRefModule,
    IconModule,
    TableModule,
  ],
  declarations: [UserUserGroupListComponent],
  exports: [UserUserGroupListComponent],
})
export class UserUserGroupListModule {}

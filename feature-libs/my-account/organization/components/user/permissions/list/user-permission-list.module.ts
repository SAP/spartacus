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
import { UserPermissionListComponent } from './user-permission-list.component';

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
  declarations: [UserPermissionListComponent],
  exports: [UserPermissionListComponent],
})
export class UserPermissionListModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, OrganizationModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OrganizationModule,
    TableModule,
    SplitViewModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletRefModule,
    PaginationModule,
  ],
  declarations: [UserListComponent],
})
export class UserListModule {}

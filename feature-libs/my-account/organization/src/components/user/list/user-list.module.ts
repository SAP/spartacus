import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RolesComponent } from '../../shared/property-renderers/roles/roles.component';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    SplitViewModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletRefModule,
    PaginationModule,
  ],
  declarations: [UserListComponent, RolesComponent],
})
export class UserListModule {}

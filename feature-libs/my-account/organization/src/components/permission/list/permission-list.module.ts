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
import { LimitComponent } from '../../shared/property-renderers/limit/limit.component';
import { PermissionListComponent } from './permission-list.component';

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
  declarations: [PermissionListComponent, LimitComponent],
})
export class PermissionListModule {}

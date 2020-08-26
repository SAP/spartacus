import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
const sharedModules = [
  CommonModule,
  RouterModule,
  SplitViewModule,
  TableModule,
  IconModule,
  UrlModule,
  I18nModule,
  PaginationModule,
  NgSelectModule,
  FormsModule,
  OutletRefModule,
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
})
export class OrganizationListModule {}

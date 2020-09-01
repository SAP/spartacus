import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { OrganizationCardListComponent } from './organization-card-list.component';

@NgModule({
  imports: [
    CommonModule,
    SplitViewModule,
    RouterModule,
    I18nModule,
    IconModule,
    UrlModule,
    TableModule,
    PaginationModule,
  ],
  declarations: [OrganizationCardListComponent],
  exports: [OrganizationCardListComponent],
})
export class OrganizationCardListModule {}

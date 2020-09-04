import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { OrganizationMessageModule } from '../organization-message/organization-message.module';
import { OrganizationListComponent } from './organization-list.component';

@NgModule({
  imports: [
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
    OrganizationMessageModule,
  ],
  declarations: [OrganizationListComponent],
  exports: [OrganizationListComponent],
})
export class OrganizationListModule {}

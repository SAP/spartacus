import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { PaginationModule, TableModule } from '@spartacus/storefront';
import { OrganizationCardModule } from '../organization-card';
import { OrganizationMessageModule } from '../organization-message/organization-message.module';
import { OrganizationSubListComponent } from './organization-sub-list.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    OrganizationCardModule,
    TableModule,
    PaginationModule,

    OrganizationMessageModule,
  ],
  declarations: [OrganizationSubListComponent],
  exports: [OrganizationSubListComponent],
})
export class OrganizationSubListModule {}

import { NgModule } from '@angular/core';
import { OrganizationFormModule } from './organization-form/organization-form.module';
import { OrganizationListModule } from './organization-list/organization-list.module';
import { OrganizationSubListModule } from './organization-sub-list/organization-sub-list.module';

@NgModule({
  imports: [
    OrganizationListModule,
    OrganizationSubListModule,
    OrganizationFormModule,
  ],
})
export class SharedOrganizationModule {}

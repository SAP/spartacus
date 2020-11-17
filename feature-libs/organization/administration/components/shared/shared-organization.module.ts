import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { OrganizationListModule } from './organization-list/organization-list.module';
import { OrganizationSubListModule } from './organization-sub-list/organization-sub-list.module';

@NgModule({
  imports: [
    OrganizationListModule,
    OrganizationSubListModule,
    FormModule,
  ],
})
export class SharedOrganizationModule {}

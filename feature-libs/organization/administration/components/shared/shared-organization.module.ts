import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { ListModule } from './list/list.module';
import { OrganizationSubListModule } from './organization-sub-list/organization-sub-list.module';

@NgModule({
  imports: [
    ListModule,
    OrganizationSubListModule,
    FormModule,
  ],
})
export class SharedOrganizationModule {}

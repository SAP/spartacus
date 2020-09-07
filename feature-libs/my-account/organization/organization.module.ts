import { NgModule } from '@angular/core';
import { OrganizationCoreModule } from '@spartacus/my-account/organization/core';
import { OrganizationOccModule } from '@spartacus/my-account/organization/occ';
import { OrganizationComponentsModule } from './components/organization-components.module';

@NgModule({
  imports: [
    OrganizationCoreModule.forRoot(),
    OrganizationOccModule,
    OrganizationComponentsModule,
  ],
})
export class OrganizationModule {}

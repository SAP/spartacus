import { NgModule } from '@angular/core';
import { OrganizationComponentsModule } from '@spartacus/organization/administration/components';
import { OrganizationCoreModule } from '@spartacus/organization/administration/core';
import { OrganizationOccModule } from '@spartacus/organization/administration/occ';

@NgModule({
  imports: [
    OrganizationCoreModule.forRoot(),
    OrganizationOccModule,
    OrganizationComponentsModule,
  ],
})
export class OrganizationModule {}

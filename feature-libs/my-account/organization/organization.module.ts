import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationComponentsModule } from '@spartacus/my-account/organization/components';
import { OrganizationCoreModule } from '@spartacus/my-account/organization/core';
import { OrganizationOccModule } from '@spartacus/my-account/organization/occ';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCoreModule.forRoot(),
    OrganizationOccModule,
    OrganizationComponentsModule,
  ],
})
export class OrganizationModule {}

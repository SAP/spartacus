import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccOrganizationConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultOccOrganizationConfig)],
})
export class VariantGenericOccModule {}

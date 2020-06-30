import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationComponentsModule } from './components/organization-components.module';
import { OrganizationCoreModule } from './core/organization-core.module';

@NgModule({
  imports: [CommonModule, OrganizationCoreModule, OrganizationComponentsModule],
})
export class OrganizationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationModule } from '@spartacus/my-account/organization';

@NgModule({
  imports: [CommonModule, OrganizationModule],
})
export class MyAccountModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationOutletComponent } from './organization-outlet.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [OrganizationOutletComponent],
  exports: [OrganizationOutletComponent],
})
export class OrganizationOutletModule {}

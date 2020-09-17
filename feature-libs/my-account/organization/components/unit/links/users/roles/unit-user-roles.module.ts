import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { OrganizationCardModule } from 'feature-libs/my-account/organization/components/shared';
import { UnitUserRolesFormComponent } from './unit-user-roles.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationCardModule,
    FormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  declarations: [UnitUserRolesFormComponent],
})
export class UnitUserRolesModule {}

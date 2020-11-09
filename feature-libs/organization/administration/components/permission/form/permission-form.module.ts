import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ActiveGuardModule } from '../../shared/active-guard.module';
import { OrganizationFormModule } from '../../shared/organization-form/organization-form.module';
import { PermissionFormComponent } from './permission-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    OrganizationFormModule,
    ActiveGuardModule,
  ],
  declarations: [PermissionFormComponent],
  exports: [PermissionFormComponent],
})
export class PermissionFormModule {}

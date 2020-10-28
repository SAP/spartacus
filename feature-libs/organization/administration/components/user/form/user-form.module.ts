import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { ActiveGuardDirective } from '../../shared/active-guard.directive';
import { OrganizationFormModule } from '../../shared/organization-form/organization-form.module';
import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OrganizationFormModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [UserFormComponent, ActiveGuardDirective],
  exports: [UserFormComponent],
})
export class UserFormModule {}

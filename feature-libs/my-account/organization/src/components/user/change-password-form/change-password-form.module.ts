import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyService, I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { ChangePasswordFormComponent } from './change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [ChangePasswordFormComponent],
  exports: [ChangePasswordFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [ChangePasswordFormComponent],
})
export class ChangePasswordFormModule {}

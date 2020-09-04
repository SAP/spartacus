import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { DateTimePickerModule, FormErrorsModule } from '@spartacus/storefront';
import { OrganizationEditModule } from '../../shared/organization-edit/organization-edit.module';
import { BudgetFormComponent } from './budget-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    FormErrorsModule,

    OrganizationEditModule,
  ],
  declarations: [BudgetFormComponent],
  exports: [BudgetFormComponent],
})
export class BudgetFormModule {}

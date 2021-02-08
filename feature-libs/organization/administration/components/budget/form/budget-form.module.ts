import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ItemActiveModule } from '../../shared/item-active.module';
import { DatePickerModule, FormErrorsModule } from '@spartacus/storefront';
import { FormModule } from '../../shared/form/form.module';
import { BudgetFormComponent } from './budget-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    ItemActiveModule,
    DatePickerModule,
  ],
  declarations: [BudgetFormComponent],
})
export class BudgetFormModule {}

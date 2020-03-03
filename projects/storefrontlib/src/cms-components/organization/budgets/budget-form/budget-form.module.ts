import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CurrencyService,
  I18nModule,
  UrlModule,
  OrgUnitService,
} from '@spartacus/core';
import { BudgetFormComponent } from './budget-form.component';
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    DatePickerModule,
  ],
  declarations: [BudgetFormComponent],
  exports: [BudgetFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [BudgetFormComponent],
})
export class BudgetFormModule {}

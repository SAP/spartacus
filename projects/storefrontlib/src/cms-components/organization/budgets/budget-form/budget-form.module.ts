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
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';
import { DateTimePickerModule } from 'projects/storefrontlib/src/shared';

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
    DateTimePickerModule,
  ],
  declarations: [BudgetFormComponent],
  exports: [BudgetFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [BudgetFormComponent],
})
export class BudgetFormModule {}

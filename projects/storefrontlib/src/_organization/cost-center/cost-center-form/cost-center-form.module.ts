import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CurrencyService,
  I18nModule,
  OrgUnitService,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule } from 'projects/storefrontlib/src/shared/components/form/form-errors/form-errors.module';
import { CurrencyCommonFormModule } from '../../shared/form/currency/currency-common-form.module';
import { UnitCommonFormModule } from '../../shared/form/unit/unit-common-form.module';
import { CostCenterFormComponent } from './cost-center-form.component';

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
    CurrencyCommonFormModule,
    UnitCommonFormModule,
  ],
  declarations: [CostCenterFormComponent],
  exports: [CostCenterFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [CostCenterFormComponent],
})
export class CostCenterFormModule {}

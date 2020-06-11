import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';
import { CurrencyFormModule } from '../../common/currency/currency-form.module';
import { UnitCommonFormModule } from '../../common/unit/unit-common-form.module';
import { CostCenterFormComponent } from './cost-center-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    CurrencyFormModule,
    UnitCommonFormModule,
  ],
  declarations: [CostCenterFormComponent],
  exports: [CostCenterFormComponent],
  entryComponents: [CostCenterFormComponent],
})
export class CostCenterFormModule {}

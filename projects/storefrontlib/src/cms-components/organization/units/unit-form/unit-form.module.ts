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
import { UnitFormComponent } from './unit-form.component';
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';

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
  declarations: [UnitFormComponent],
  exports: [UnitFormComponent],
  providers: [CurrencyService, OrgUnitService],
  entryComponents: [UnitFormComponent],
})
export class UnitFormModule {}

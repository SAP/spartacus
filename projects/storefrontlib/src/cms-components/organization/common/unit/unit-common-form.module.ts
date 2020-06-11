import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule } from '../../../../shared/components/form/form-errors/form-errors.module';
import { UnitCommonFormComponent } from './unit-common-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
  ],
  declarations: [UnitCommonFormComponent],
  exports: [UnitCommonFormComponent],
  entryComponents: [UnitCommonFormComponent],
})
export class UnitCommonFormModule {}

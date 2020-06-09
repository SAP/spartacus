import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule, OrgUnitService } from '@spartacus/core';
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { B2BUserFormComponent } from './user-form.component';
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
    DatePickerModule,
    FormErrorsModule,
  ],
  declarations: [B2BUserFormComponent],
  exports: [B2BUserFormComponent],
  providers: [OrgUnitService],
  entryComponents: [B2BUserFormComponent],
})
export class B2BUserFormModule {}

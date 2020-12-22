import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule } from '../form-errors/form-errors.module';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormErrorsModule, I18nModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}

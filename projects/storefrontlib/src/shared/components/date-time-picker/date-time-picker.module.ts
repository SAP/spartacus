import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DateTimePickerComponent],
  exports: [DateTimePickerComponent],
})
export class DateTimePickerModule {}

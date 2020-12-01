import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerFallbackDirective } from './date-picker-fallback.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DatePickerFallbackDirective],
  exports: [DatePickerFallbackDirective],
})
export class DatePickerModule {}

import { NgModule } from '@angular/core';
import { DateValueAccessorDirective } from './date-value-accessor.directive';

@NgModule({
  declarations: [DateValueAccessorDirective],
  exports: [DateValueAccessorDirective]
})
export class DateValueAccessorModule { }

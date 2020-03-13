import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  exports: [AutoFocusDirective],
})
export class AutoFocusDirectiveModule {}

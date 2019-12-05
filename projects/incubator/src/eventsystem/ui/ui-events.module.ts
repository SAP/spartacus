import { NgModule } from '@angular/core';
import { UiEventDirective } from './ui-event.directive';

@NgModule({
  declarations: [UiEventDirective],
  exports: [UiEventDirective],
})
export class UiEventModule {}

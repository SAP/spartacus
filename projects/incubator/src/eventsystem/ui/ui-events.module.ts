import { NgModule } from '@angular/core';
import { ClickEventDirective } from './click-event.directive';

@NgModule({
  declarations: [ClickEventDirective],
  exports: [ClickEventDirective],
})
export class UiEventModule {}

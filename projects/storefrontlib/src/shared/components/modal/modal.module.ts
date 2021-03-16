import { NgModule } from '@angular/core';
import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [ModalDirective],
  exports: [ModalDirective],
})
export class ModalModule {}

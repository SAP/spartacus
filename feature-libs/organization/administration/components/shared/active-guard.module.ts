import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveGuardDirective } from './active-guard.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ActiveGuardDirective],
  exports: [ActiveGuardDirective],
})
export class ActiveGuardModule {}

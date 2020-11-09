import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExistGuardDirective } from './exist-guard.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ExistGuardDirective],
  exports: [ExistGuardDirective],
})
export class ExistGuardModule {}

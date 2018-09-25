import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletDirective } from './outlet.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OutletDirective],
  exports: [OutletDirective]
})
export class OutletModule {}

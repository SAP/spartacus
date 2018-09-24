import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletDirective } from './outlet.directive';
import { OutletRefModule } from './outlet-ref/outlet-ref.module';

@NgModule({
  imports: [CommonModule, OutletRefModule],
  declarations: [OutletDirective],
  exports: [OutletDirective]
})
export class OutletModule {}

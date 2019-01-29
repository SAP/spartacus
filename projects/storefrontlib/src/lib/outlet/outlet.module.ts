import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletDirective } from './outlet.directive';
import { OutletService } from './outlet.service';

@NgModule({
  imports: [CommonModule],
  declarations: [OutletDirective],
  providers: [OutletService],
  exports: [OutletDirective]
})
export class OutletModule {}

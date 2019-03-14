import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSlotComponent } from './page-slot.component';
import { OutletModule } from '../../../lib/outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';

@NgModule({
  imports: [CommonModule, OutletModule, PageComponentModule],
  providers: [],
  declarations: [PageSlotComponent],
  exports: [PageSlotComponent]
})
export class PageSlotModule {}

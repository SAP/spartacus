import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSlotComponent } from './page-slot.component';
import { OutletModule } from 'projects/storefrontlib/src/lib/outlet';
import { PageComponentModule } from '../component/page-component.module';

@NgModule({
  imports: [CommonModule, OutletModule, PageComponentModule],
  providers: [],
  declarations: [PageSlotComponent],
  exports: [PageSlotComponent]
})
export class PageSlotModule {}

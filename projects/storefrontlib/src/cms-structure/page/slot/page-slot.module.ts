import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletModule } from '../../outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';
import { PageSlotComponent } from './page-slot.component';
import { PageSlotService } from './page-slot.service';

@NgModule({
  imports: [CommonModule, OutletModule, PageComponentModule],
  declarations: [PageSlotComponent],
  exports: [PageSlotComponent],
})
export class PageSlotModule {
  // instantiate PageSlotService ASAP, so it can examine SSR pre-rendered DOM
  constructor(_pageSlot: PageSlotService) {}
}

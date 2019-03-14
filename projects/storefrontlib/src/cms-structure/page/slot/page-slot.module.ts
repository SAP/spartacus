import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSlotComponent } from './page-slot.component';
import { OutletModule } from 'projects/storefrontlib/src/lib/outlet';
import { CmsModule } from '../../../lib/cms/index';

@NgModule({
  imports: [CommonModule, OutletModule, CmsModule],
  providers: [],
  declarations: [PageSlotComponent],
  exports: [PageSlotComponent]
})
export class PageSlotModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletModule } from '../../outlet/outlet.module';
import { PageComponentModule } from '../component/page-component.module';
import { PageSlotComponent } from './page-slot.component';
import { SkipModule } from '../../../layout/a11y/skip-link/directive/skip.module';

@NgModule({
  imports: [CommonModule, OutletModule, PageComponentModule, SkipModule],
  providers: [],
  declarations: [PageSlotComponent],
  exports: [PageSlotComponent],
})
export class PageSlotModule {}

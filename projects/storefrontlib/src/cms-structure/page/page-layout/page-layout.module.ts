import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import { OutletModule } from '../../outlet/outlet.module';
import { PageLayoutComponent } from './page-layout.component';
import { PageLayoutService } from './page-layout.service';

@NgModule({
  imports: [CommonModule, OutletModule, PageSlotModule],
  declarations: [PageLayoutComponent],
  providers: [PageLayoutService],
  exports: [PageLayoutComponent],
})
export class PageLayoutModule {}

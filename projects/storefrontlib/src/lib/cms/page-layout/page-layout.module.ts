import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { CmsModule } from '../cms.module';
import { PageLayoutService } from './page-layout.service';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';

@NgModule({
  imports: [CommonModule, CmsModule, PageSlotModule],
  declarations: [PageLayoutComponent],
  providers: [PageLayoutService],
  exports: [PageLayoutComponent]
})
export class PageLayoutModule {}

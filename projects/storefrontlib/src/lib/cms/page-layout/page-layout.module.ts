import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { CmsModule } from '../cms.module';
import { PageLayoutService } from './page-layout.service';
import { OutletModule } from '../../outlet';

@NgModule({
  imports: [CommonModule, CmsModule, OutletModule],
  declarations: [PageLayoutComponent],
  providers: [PageLayoutService],
  exports: [PageLayoutComponent]
})
export class PageLayoutModule {}

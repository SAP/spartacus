import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { CmsModule } from '../cms.module';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [PageLayoutComponent],
  exports: [PageLayoutComponent]
})
export class PageLayoutModule {}

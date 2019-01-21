import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './page-template.component';
import { CmsModule } from '../../../cms';
import { OutletModule } from '../../../outlet';

@NgModule({
  imports: [CommonModule, CmsModule, OutletModule],
  declarations: [PageTemplateComponent],
  exports: [PageTemplateComponent]
})
export class PageTemplateModule {}

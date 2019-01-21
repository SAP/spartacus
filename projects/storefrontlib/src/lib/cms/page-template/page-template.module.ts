import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './page-template.component';
import { CmsModule } from '../cms.module';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [PageTemplateComponent],
  exports: [PageTemplateComponent]
})
export class PageTemplateModule {}

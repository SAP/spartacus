import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '../../../cms/cms.module';
import { CategoryPageLayoutComponent } from './category-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [CategoryPageLayoutComponent],
  exports: [CategoryPageLayoutComponent]
})
export class CategoryPageLayoutModule {}

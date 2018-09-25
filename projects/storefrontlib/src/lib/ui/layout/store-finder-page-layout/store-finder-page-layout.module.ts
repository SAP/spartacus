import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import { CmsModule } from '../../../cms/cms.module';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [StoreFinderPageLayoutComponent],
  exports: [StoreFinderPageLayoutComponent]
})
export class StoreFinderPageLayoutModule {}

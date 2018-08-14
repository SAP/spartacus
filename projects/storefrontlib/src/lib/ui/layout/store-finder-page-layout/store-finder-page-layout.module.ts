import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import { CmsModule } from '../../../cms/cms.module';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [CommonModule, CmsModule, MaterialModule],
  declarations: [StoreFinderPageLayoutComponent],
  exports: [StoreFinderPageLayoutComponent]
})
export class StoreFinderPageLayoutModule {}

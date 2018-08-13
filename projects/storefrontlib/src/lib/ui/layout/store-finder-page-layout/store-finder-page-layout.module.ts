import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../../product/product.module';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import { CmsModule } from '../../../cms/cms.module';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    CmsModule,
    MaterialModule
  ],
  declarations: [StoreFinderPageLayoutComponent],
  exports: [StoreFinderPageLayoutComponent]
})
export class StoreFinderPageLayoutModule {}

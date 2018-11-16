import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsModule } from '../../../cms/cms.module';
import { ProductModule } from '../../../product/product.module';
import { StoreFinderModule } from '../../../store-finder/store-finder.module';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    CmsModule,
    StoreFinderModule,
    RouterModule
  ],
  declarations: [StoreFinderPageLayoutComponent],
  exports: [StoreFinderPageLayoutComponent]
})
export class StoreFinderPageLayoutModule {}

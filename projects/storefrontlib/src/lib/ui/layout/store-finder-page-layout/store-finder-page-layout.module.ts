import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import { CmsModule } from '../../../cms/cms.module';
import { MaterialModule } from '../../../material.module';
import {ProductModule} from '../../../product/product.module';
import {StoreFinderModule} from '../../../store-finder/store-finder.module';

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    CmsModule,
    MaterialModule,
    StoreFinderModule
  ],
  declarations: [StoreFinderPageLayoutComponent],
  exports: [StoreFinderPageLayoutComponent]
})
export class StoreFinderPageLayoutModule {}

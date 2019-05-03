import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CmsModule, I18nModule } from '@spartacus/core';
import { OutletModule } from 'projects/storefrontlib/src/lib/outlet';
import { ComponentsModule } from '../../../lib/ui/components/index';
import { AddToCartModule, CartSharedModule } from '../../checkout/index';
// guards
import { ProductDetailsComponent } from './container/product-details.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CartSharedModule,
    CmsModule,
    AddToCartModule,
    OutletModule,
    I18nModule,
  ],
  declarations: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductImagesComponent,
  ],
  exports: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductImagesComponent,
  ],
})
export class ProductDetailsModule {}

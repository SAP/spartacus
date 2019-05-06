import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CmsModule, I18nModule } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import {
  FormComponentsModule,
  MediaModule,
  StarRatingModule,
} from '../../../shared/index';
import { AddToCartModule, CartSharedModule } from '../../checkout/index';
import { ProductDetailsComponent } from './container/product-details.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartSharedModule,
    CmsModule,
    AddToCartModule,
    OutletModule,
    I18nModule,
    FormComponentsModule,
    MediaModule,
    StarRatingModule,
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

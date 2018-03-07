import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductDetailsComponent } from './container/product-details.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';

import { CmsModule } from '../../../cms/cms.module'; // some slots are loaded inside components (i.e. tabs)

import { MediaModule } from '../../../ui/components/media/media.module';
import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,
    AddToCartModule
  ],
  declarations: [
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    StarRatingComponent,
    ProductReviewsComponent
  ],
  exports: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductImagesComponent,
    StarRatingComponent,
    ProductReviewsComponent
  ]
})
export class ProductDetailsModule {}

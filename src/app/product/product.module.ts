import { ProductGuard } from './guards/product-guard';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { ProductAttributesComponent } from './components/product-attributes/product-attributes.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';
import * as fromConverter from './converters';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { MediaModule } from 'app/ui/components/media/media.module';
import { MaterialModule } from 'app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CmsModule } from 'app/cms/cms.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MediaModule,
    MaterialModule,
    FlexLayoutModule,
    CmsModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature(effects)
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
    ProductImagesComponent
  ],
  providers: [
    ...fromConverter.services,
    ProductGuard
    // {
    //   // TODO: configure locale
    //   provide: LOCALE_ID,
    //   useValue: 'en-EN'
    // }
  ]
  // declarations: [...fromComponents.components],
  // exports: [...fromComponents.components]
})
export class ProductModule {}

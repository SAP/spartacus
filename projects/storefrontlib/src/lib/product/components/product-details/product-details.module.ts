import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsModule } from '../../../cms/cms.module';
import { OutletModule } from '../../../outlet/index';
import { StylingModule } from '../../../styling/styling.module';
import { AddToCartModule } from '../../../cart/add-to-cart/add-to-cart.module';
import { CartSharedModule } from './../../../cart/cart-shared/cart-shared.module';
import { ComponentsModule } from './../../../ui/components/components.module';

import { ProductDetailsComponent } from './container/product-details.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
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
    StylingModule
  ],
  declarations: [
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductReviewsComponent
  ],
  exports: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductImagesComponent,
    ProductReviewsComponent
  ]
})
export class ProductDetailsModule {}

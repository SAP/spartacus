import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StylingDirective } from '../styling/styling.directive';
import { BootstrapModule } from '../../../bootstrap.module';
import { CmsModule } from '../../../cms/cms.module';
import { OutletModule } from '../../../outlet/index';
import { ComponentsModule } from './../../../ui/components/components.module';
import { AddToCartModule } from '../../../cart/components/add-to-cart/add-to-cart.module';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';

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
    BootstrapModule,
    OutletModule
  ],
  declarations: [
    ProductSummaryComponent,
    ProductAttributesComponent,
    ProductDetailsComponent,
    ProductImagesComponent,
    ProductReviewsComponent,
    StylingDirective
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

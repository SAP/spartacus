import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { AddToCartModule } from '../../../../cms-components/checkout/cart/add-to-cart/add-to-cart.module';
// guards
import { CartSharedModule } from '../../../../cms-components/checkout/cart/cart-shared/cart-shared.module';
import { StarRatingModule } from '../../../../common-components/index';
import { CmsModule } from '../../../cms/cms.module'; // some slots are loaded inside components (i.e. tabs)
import { OutletModule } from '../../../outlet/index';
import { ComponentsModule } from './../../../ui/components/components.module';
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

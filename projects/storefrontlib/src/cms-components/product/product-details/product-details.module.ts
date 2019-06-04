import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CmsModule, I18nModule, UrlModule } from '@spartacus/core';
import { OutletModule } from '../../../cms-structure/outlet/index';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import {
  FormComponentsModule,
  MediaModule,
  StarRatingModule,
} from '../../../shared/index';
import { AddToCartModule, CartSharedModule } from '../../cart/index';
import { ProductDetailsComponent } from './container/product-details.component';
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
    UrlModule,
    PageSlotModule,
  ],
  declarations: [ProductDetailsComponent, ProductSummaryComponent],
  exports: [ProductDetailsComponent, ProductSummaryComponent],
})
export class ProductDetailsModule {}

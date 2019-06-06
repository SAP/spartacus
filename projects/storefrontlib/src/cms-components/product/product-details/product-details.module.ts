import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsModule,
  I18nModule,
  UrlModule,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
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
import { ProductVariantSelectorComponent } from './product-summary/product-variant-selector.component';

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
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          selector: 'cx-product-variant-selector',
        },
      },
    }),
  ],
  declarations: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductVariantSelectorComponent,
  ],
  exports: [
    ProductDetailsComponent,
    ProductSummaryComponent,
    ProductVariantSelectorComponent,
  ],
  entryComponents: [ProductVariantSelectorComponent],
})
export class ProductDetailsModule {}

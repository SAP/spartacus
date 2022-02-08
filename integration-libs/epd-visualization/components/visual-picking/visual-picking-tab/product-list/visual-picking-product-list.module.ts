import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CarouselModule,
  IconModule,
  MediaModule,
  ProductReferencesModule,
} from '@spartacus/storefront';
import { CompactAddToCartModule } from './compact-add-to-cart/compact-add-to-cart.module';
import { PagedListModule } from './paged-list/paged-list.module';
import { VisualPickingProductListComponent } from './visual-picking-product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductReferencesModule,
    MediaModule,
    IconModule,
    CarouselModule,
    PagedListModule,
    AddToCartModule,
    UrlModule,
    I18nModule,
    CompactAddToCartModule,
    AddToCartModule,
  ],
  declarations: [VisualPickingProductListComponent],
  exports: [VisualPickingProductListComponent],
  entryComponents: [VisualPickingProductListComponent],
})
export class VisualPickingProductListModule {}

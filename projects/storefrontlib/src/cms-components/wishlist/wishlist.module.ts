import { NgModule } from '@angular/core';
import { WishlistComponent } from './components/wish-list/wishlist.component';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ProductListModule } from '../product/product-list';
import { WishListItemComponent } from './components/wish-list-item/wish-list-item.component';
import { RouterModule } from '@angular/router';
import { MediaModule } from '../../shared/components/media';
import { StarRatingModule } from '../../shared/components/star-rating';
import { AddToCartModule } from '../cart';

@NgModule({
  imports: [
    AddToCartModule,
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        WishListComponent: {
          component: WishlistComponent,
        },
      },
    }),
    I18nModule,
    MediaModule,
    ProductListModule,
    RouterModule,
    StarRatingModule,
    UrlModule,
  ],
  declarations: [WishlistComponent, WishListItemComponent],
  entryComponents: [WishlistComponent],
  exports: [WishlistComponent, WishListItemComponent],
})
export class WishListModule {}
